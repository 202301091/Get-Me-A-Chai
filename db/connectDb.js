
import mongoose from "mongoose";

const connectDb = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
            });
            return conn;
            
        } catch (error) {
            process.exit(1);
        }
    }

  export default connectDb;