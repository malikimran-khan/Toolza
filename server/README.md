# 🏠 Toolza - Main Server

The core of the Toolza platform. It manages the link database, click tracking, and the unique URL Masking redirection logic.

## 📋 Features

- **Link Management**: Create, view, and delete personalized masked links.
- **URL Masking**: Serving target sites within an iframe to keep the Toolza brand visible in the address bar.
- **Click Tracking**: Dynamic monitoring of link engagement.

## 🛠️ Setup & Installation

1. **Navigate to directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://your_mongo_url
   JWT_SECRET=your_system_secret_key
   NODE_ENV=development
   ```

4. **Run the service:**
   ```bash
   npm run dev
   ```

## 📍 Key Logic

- `GET /r/:subdomain`: The redirection engine. Finds the original URL and serves it via an iframe-based masking template.
- `api/links`: Protected API for managing user-specific links.
