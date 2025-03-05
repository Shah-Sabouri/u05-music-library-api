const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("[Server]: MongoDB är ansluten");
    } catch (error) {
        console.error(`[Error]: ${error.message}`);
        process.exit(1); // Processen avslutas, (1) signalerar att ett fel har inträffat
    }
};

module.exports = connectDB;
