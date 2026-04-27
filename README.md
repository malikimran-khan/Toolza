# 🛠️ Toolza - Power Tools for the Web

Toolza is a professional-grade, microservices-based platform offering high-performance web tools, including URL masking, PDF processing, and image conversion.

## 🏗️ Architecture Overview

Toolza is split into specialized services to ensure scalability and security.

| Service | Directory | Port | Responsibility |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `/api-gateway` | `8000` | Entry point. Routes traffic to appropriate backends. |
| **Authentication** | `/authentication`| `5002` | Handles user accounts, JWT, and Google OAuth. |
| **Media Service** | `/image-pdf-service`| `5001` | Handles PDF-to-Word, Image Conversion, etc. |
| **Main Server** | `/server` | `5000` | Core logic for URL Masking and Link management. |
| **Frontend** | `/client` | `5173` | React/Vite dashboard and user interface. |

---

## 🚀 Quick Start (Running Everything)

You can launch the entire ecosystem with a single command from this root directory:

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start all services:**
   ```bash
   npm run start-all
   ```

---

## 📂 Project Structure

```text
Toolza/
├── client/                 # React Frontend
├── api-gateway/            # Centralized API Proxy
├── authentication/         # User & OAuth Service
├── image-pdf-service/      # Media Processing Engine
└── server/                 # URL Masking & Core Logic
```

## 🔐 Security Policy

All file processing and link creation services are protected by **JWT Authentication**. Users must have a valid account (Email or Google) to access these features.

## 📄 Service Documentation

For detailed information on a specific service, please refer to the README within its directory:

- [API Gateway Readme](./api-gateway/README.md)
- [Authentication Readme](./authentication/README.md)
- [Media Service Readme](./image-pdf-service/README.md)
- [Main Server Readme](./server/README.md)
- [Frontend Readme](./client/README.md)
