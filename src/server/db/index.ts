import mongoose, { Connection } from 'mongoose';

interface MongoConnection {
    conn: Connection | null;
    promise: Promise<Connection> | null;
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/feedback";
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached: MongoConnection = (global as any).mongoose || { conn: null, promise: null };

async function connectDb(): Promise<Connection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
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