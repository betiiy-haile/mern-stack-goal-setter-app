import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1)
    }
}


export default connectDB