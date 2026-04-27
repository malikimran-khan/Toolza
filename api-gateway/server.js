const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

// Define service targets
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://localhost:5002';
const MEDIA_SERVICE = process.env.MEDIA_SERVICE_URL || 'http://localhost:5001';
const MAIN_SERVER = process.env.MAIN_SERVER_URL || 'http://localhost:5000';

console.log('🚀 API Gateway starting...');

// 1. Authentication Proxy
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '', // Auth service health/routes are relative to root
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] Auth: ${req.method} ${req.url}`);
    }
}));

// 2. Media Service Proxy (PDF Tools)
app.use('/api/pdf', createProxyMiddleware({
    target: MEDIA_SERVICE,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] PDF: ${req.method} ${req.url}`);
    }
}));

// 3. Media Service Proxy (Image Converter)
app.use('/api/convert', createProxyMiddleware({
    target: MEDIA_SERVICE,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] Image: ${req.method} ${req.url}`);
    }
}));

// 4. Main Server Proxy (Links & Redirection)
app.use('/api/links', createProxyMiddleware({
    target: MAIN_SERVER,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] Links: ${req.method} ${req.url}`);
    }
}));

app.use('/r', createProxyMiddleware({
    target: MAIN_SERVER,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] Masking: ${req.method} ${req.url}`);
    }
}));

// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        gateway: 'Centralized API Gateway',
        services: {
            auth: AUTH_SERVICE,
            media: MEDIA_SERVICE,
            main: MAIN_SERVER
        }
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`⚡ API Gateway running on http://localhost:${PORT}`);
    console.log(`- Auth (5002)   -> /api/auth`);
    console.log(`- Media (5001)  -> /api/pdf, /api/convert`);
    console.log(`- Main (5000)   -> /api/links, /r`);
});
