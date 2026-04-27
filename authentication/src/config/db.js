const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/toolza';
        const conn = await mongoose.connect(mongoUri);
        console.log(`✅ Auth Service MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Auth Service DB Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
