const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const PORT = process.env.AUTH_PORT || 5002;

app.listen(PORT, () => {
    console.log(`🔒 Authentication Service is running on port ${PORT}`);
});
