import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.MONGODB_NAME as string;

interface CachedConnection {
  client: MongoClient;
  db: Db;
}

let cachedConnection: CachedConnection | null = null;

export async function connectDB(): Promise<CachedConnection> {
  if (cachedConnection) {
    // 캐시된 연결이 있으면 재사용
    return cachedConnection;
  }

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  const client = new MongoClient(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(DB_NAME);

  cachedConnection = { client, db };

  return { client, db };
}
