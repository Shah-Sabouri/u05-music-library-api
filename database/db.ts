import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB as string);
        console.log("[Server]: MongoDB är ansluten");
    } catch (error: any) {
        console.error(`[Error]: ${error.message}`);
        process.exit(1); // Processen avslutas om det är ett fel
    }
};

export default connectDB;
