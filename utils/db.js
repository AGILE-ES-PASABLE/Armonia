import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.set('debug', true); // Habilitar el modo de depuración

        if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
        console.log("db connected");
        }
    } catch (error) {
        console.log(error);
    }
};