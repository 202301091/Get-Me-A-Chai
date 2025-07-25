import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // ✅ removed useNewUrlParser
        return conn;
    } catch (error) {
        console.error("MongoDB connection error:", error); // add this for debugging
        process.exit(1);
    }
};

export default connectDb;
