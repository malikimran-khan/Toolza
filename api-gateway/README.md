# 🛰️ Toolza - API Gateway

The API Gateway is the central entry point for the Toolza ecosystem. It simplifies client-side communication by proxying requests to the appropriate internal microservices.

## 📋 Features

- **Centralized Routing**: Routes `/api/auth`, `/api/pdf`, `/api/links`, etc., to their respective servers.
- **CORS Management**: Handles cross-origin requests consistently.
- **Request Logging**: Monitors traffic across all services.

## 🛠️ Setup & Installation

1. **Navigate to directory:**
   ```bash
   cd api-gateway
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file based on the dummy values below:
   ```env
   PORT=8000
   AUTH_SERVICE_URL=http://localhost:5002
   MEDIA_SERVICE_URL=http://localhost:5001
   MAIN_SERVER_URL=http://localhost:5000
   NODE_ENV=development
   ```

4. **Run the service:**
   ```bash
   npm run dev
   ```

## 📍 Route Mapping

| Incoming Path | Target Service |
| :--- | :--- |
| `/api/auth/*` | Authentication (Port 5002) |
| `/api/pdf/*` | Media Service (Port 5001) |
| `/api/convert/*`| Media Service (Port 5001) |
| `/api/links/*` | Main Server (Port 5000) |
| `/r/*` | URL Redirection (Port 5000) |
