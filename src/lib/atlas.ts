// src/lib/atlas.ts
import * as Realm from "realm-web";

let app: Realm.App | null = null;

export function getRealmApp() {
  if (!app) {
    const appId = import.meta.env.VITE_ATLAS_APP_ID as string;
    if (!appId) throw new Error("VITE_ATLAS_APP_ID not set");
    app = new Realm.App({ id: appId });
  }
  return app;
}

export async function getUser() {
  const app = getRealmApp();
  if (app.currentUser?.isLoggedIn) return app.currentUser;
  // Anonymous for now; later switch to Custom JWT
  return await app.logIn(Realm.Credentials.anonymous());
}
