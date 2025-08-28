// src/api/cards.ts
import * as Realm from "realm-web";
import { getUser } from "@/lib/atlas";

export type Card = {
  walletAddress: string;
  displayName?: string | null;
  tier?: string | null;
  metadata?: Record<string, any>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

type CardDoc = Card & {
  _id: Realm.BSON.ObjectId;
};

function toCard(doc: CardDoc): Card {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...rest } = doc;
  return rest;
}

export async function fetchCard(walletAddress: string) {
  const user = await getUser();
  const mongodb = user.mongoClient("mongodb-atlas");
  const cards = mongodb.db("halocard").collection<CardDoc>("cards");

  // IMPORTANT: don't project out _id here, or TS will complain;
  // keep _id in the doc for typing, then strip it in code.
  const doc = await cards.findOne({ walletAddress });
  return { exists: !!doc, card: doc ? toCard(doc) : null };
}

/** Calls your Atlas Function: createCardIfNotExists(walletAddress, displayName, tier, metadata) */
export async function createCard(input: {
  walletAddress: string;
  displayName?: string;
  tier?: string;
  metadata?: Record<string, any>;
}) {
  const user = await getUser();
  const res = await user.functions.createCardIfNotExists(
    input.walletAddress,
    input.displayName || null,
    input.tier || null,
    input.metadata || {}
  );

  // Function returns { ok: boolean, error?: string, card?: Card }
  if (!res?.ok) {
    const err: any = new Error(res?.error || "server_error");
    if (res?.error === "card_exists") err.code = 409;
    throw err;
  }
  // If your Function returns the inserted doc without _id, this type matches:
  return res as { ok: true; card: Card };
}

/** Fetch latest N by createdAt desc */
export async function fetchLatestCards(limit = 6): Promise<Card[]> {
  const user = await getUser();
  const mongodb = user.mongoClient("mongodb-atlas");
  const col = mongodb.db("halocard").collection<CardDoc>("cards");

  // Ensure you have an index on { createdAt: -1 } in Atlas for speed
  const docs = await col.find({}, { sort: { createdAt: -1 }, limit });
  return docs.map(toCard);
}

/**
 * Check if a card already exists for a given wallet address.
 * Returns true if card exists, false otherwise.
 */
export async function hasCard(walletAddress: string): Promise<boolean> {
  if (!walletAddress) return false;

  const user = await getUser();
  const mongodb = user.mongoClient("mongodb-atlas");
  const col = mongodb.db("halocard").collection<CardDoc>("cards");

  const existing = await col.findOne({ walletAddress }, { projection: { _id: 1 } });
  return !!existing;
}