require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 5001;

const server = app.listen(port, () => {
    console.log(`🚀 Node.js Media Service running on port ${port}`);
    console.log(`📡 Endpoints active at /api and /api/pdf`);
});

// Handle errors during startup (e.g. port already in use)
server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;
    switch (error.code) {
        case 'EACCES':
            console.error(`❌ Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`❌ Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

