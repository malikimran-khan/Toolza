const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ─── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger (dev only) ────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// ─── Routes ───────────────────────────────────────────────
app.use('/api/links', require('./routes/linkRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/', require('./routes/redirectRoutes'));

// ─── Health Check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Toolza API is running 🚀',
    timestamp: new Date().toISOString(),
  });
});

// ─── Error Handler ────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Toolza Server running on port ${PORT}`);
  console.log(`📡 API:      http://localhost:${PORT}/api`);
  console.log(`🔗 Redirect: http://localhost:${PORT}/r/:subdomain`);
  console.log(`❤️  Health:   http://localhost:${PORT}/api/health\n`);
});