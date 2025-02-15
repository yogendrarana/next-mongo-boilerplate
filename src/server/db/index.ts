import mongoose from "mongoose";

interface Connection {
    isConnected?: number;
}

const dbUri = process.env.MONGODB_URI!;

if (!dbUri) {
    throw new Error("Please add your MongoDB URI to .env");
}

const connection: Connection = {};

async function connectDb() {
    if (connection.isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(dbUri);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        throw error;
    }
}

// For development: Handle hot reloading
if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongooseConnection) {
        (global as any)._mongooseConnection = connection;
    }
}

export { connectDb };
