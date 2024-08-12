import mongoose, { Connection } from 'mongoose';

interface MongoConnection {
    conn: Connection | null;
    promise: Promise<Connection> | null;
}

const productionDbUri = process.env.MONGODB_URI;
const localDbUri = "mongodb://localhost:27017/next-mongo-boilerplate";

if (process.env.NODE_ENV === "production" && !productionDbUri) {
    throw new Error('Please define the production MONGODB_URI environment variable');
}

if (!localDbUri) {
    throw new Error('Please define the local MONGODB_URI environment variable');
}

const uri = process.env.NODE_ENV === 'production'
    ? productionDbUri
    : localDbUri;

let cached: MongoConnection = (global as any).mongoose || { conn: null, promise: null };

async function connectDb(): Promise<Connection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(uri!, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
}

(global as any).mongoose = cached;

export { connectDb };