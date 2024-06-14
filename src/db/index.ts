import mongoose from 'mongoose';

interface MongoConnection {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gita';

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached: MongoConnection = global.mongoose || { conn: null, promise: null };

async function connectDb(): Promise<mongoose.Connection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongoose) => mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
        console.log('MongoDB connected');
        return cached.conn;
    } catch (err: any) {
        cached.promise = null;
        throw new Error(`Failed to connect to MongoDB: ${err.message}`);
    }
}

if (!global.mongoose) {
    global.mongoose = cached;
}

export default connectDb;