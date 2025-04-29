import mongoose from "mongoose";

export const connectdb = async () => {
    try {
        await mongoose.connect(process.env.mongodb_url);
        console.log("Database Connected");

    } catch (error) {
        console.log("mongodb connection error:", error);
    }
};

