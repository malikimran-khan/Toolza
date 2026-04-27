const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Since the proxy in Vite expects /api/auth to be mapped to the root of this service, 
// we'll mount our routes at /
app.use('/', authRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'active', service: 'authentication' });
});

module.exports = app;
