const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URL;
        
        // Extract username and detect connection type from MongoDB URI
        let username = 'Unknown';
        let connectionType = 'Unknown';
        
        if (mongoUri) {
            if (mongoUri.includes('mongodb.net') || mongoUri.includes('mongodb+srv://')) {
                connectionType = 'MongoDB Atlas (Cloud)';
                const uriMatch = mongoUri.match(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/);
                if (uriMatch) {
                    username = uriMatch[2];
                }
            } else if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
                connectionType = 'Local MongoDB';
                username = 'Local User';
            } else {
                connectionType = 'Other MongoDB Instance';
            }
        }
        
        await mongoose.connect(mongoUri);
        console.log("✅ Connected to MongoDB");
        console.log(`🌐 Connection Type: ${connectionType}`);
        console.log(`👤 Connected as user: ${username}`);
        
        // Log database name
        const dbName = mongoose.connection.db.databaseName;
        console.log(`🗄️  Database: ${dbName}`);
        
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        console.log("💡 Make sure MongoDB is running or set MONGODB_URL in .env file");
        process.exit(1);
    }
};

module.exports = connectDB;