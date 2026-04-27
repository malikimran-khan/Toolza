const express = require('express');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', imageRoutes);
app.use('/api/pdf', pdfRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'node-media-converter' });
});

module.exports = app;
