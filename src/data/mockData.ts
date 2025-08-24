export interface HaloCardData {
  id: string;
  pubkey: string;
  username: string;
  tier: 'Angel' | 'Archangel' | 'Cherubim';
  tagline?: string;
  createdAt: string;
}

export const mockCards: HaloCardData[] = [
  {
    id: '1',
    pubkey: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    username: 'CloudWalker',
    tier: 'Cherubim',
    tagline: 'Ascending beyond the clouds',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    pubkey: '4NCHbXpn4KjqjKhGKBpXKxSWBkVGpWK5sdfgdUt2AHHB',
    username: 'HeavenSeeker',
    tier: 'Archangel',
    tagline: 'Guardian of the sacred realm',
    createdAt: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    pubkey: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    username: 'DivineSpark',
    tier: 'Angel',
    tagline: 'Spreading light in the darkness',
    createdAt: '2024-01-13T08:20:00Z',
  },
  {
    id: '4',
    pubkey: '5Zf8kJYX9o8QFGFjTmqEwqvPXGQHNm4Rj9Kk8QFGFjTm',
    username: 'SkyDancer',
    tier: 'Archangel',
    tagline: 'Dancing among the stars',
    createdAt: '2024-01-12T12:15:00Z',
  },
  {
    id: '5',
    pubkey: '8K7aBpKzRvmXGHdPqUFfSzMqRdRcWkKmNzHcQrN3VfZL',
    username: 'EtherealBeing',
    tier: 'Cherubim',
    tagline: 'Transcending mortal boundaries',
    createdAt: '2024-01-11T18:30:00Z',
  },
  {
    id: '6',
    pubkey: '2BvNjsQnRpTmZbQhCwKqMnHvRzNsQrTpZbQhCwKqMnHv',
    username: 'AstralGuide',
    tier: 'Angel',
    tagline: 'Leading souls to enlightenment',
    createdAt: '2024-01-10T07:45:00Z',
  },
  {
    id: '7',
    pubkey: '6CkPmTnZfQvKbRhDwJsNqUrTmVfZfQvKbRhDwJsNqUrT',
    username: 'CelestialVoice',
    tier: 'Archangel',
    tagline: 'Singing the songs of heaven',
    createdAt: '2024-01-09T14:20:00Z',
  },
  {
    id: '8',
    pubkey: '3HrZcQwMjNgFkRpTmXvZbQhDwKqNrHrZcQwMjNgFkRpT',
    username: 'LightBearer',
    tier: 'Angel',
    tagline: 'Illuminating the path forward',
    createdAt: '2024-01-08T11:10:00Z',
  },
  {
    id: '9',
    pubkey: '1ApKzRvmNgFjTpZbRhCwMqUrTmVzApKzRvmNgFjTpZb',
    username: 'SeraphicFlame',
    tier: 'Cherubim',
    tagline: 'Burning with divine purpose',
    createdAt: '2024-01-07T16:55:00Z',
  },
];

// In-memory store for new cards (in a real app, this would be a database)
export const cardStore = [...mockCards];