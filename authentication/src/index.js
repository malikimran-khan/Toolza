const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const PORT = process.env.AUTH_PORT || 5002;

app.listen(PORT, () => {
    console.log(`🔒 Authentication Service is running on port ${PORT}`);
});
