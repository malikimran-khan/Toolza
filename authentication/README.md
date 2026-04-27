# 🔒 Toolza - Authentication Service

A standalone microservice dedicated to user security, identity management, and authorization across the Toolza platform.

## 📋 Features

- **Google OAuth**: One-tap sign-in integration.
- **JWT Authentication**: Issues secure tokens for service-to-service authorization.
- **Modular Structure**: Organized into Controllers, Models, and Routes.
- **Password Security**: Automatic hashing using bcrypt.

## 🛠️ Setup & Installation

1. **Navigate to directory:**
   ```bash
   cd authentication
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file with your actual values:
   ```env
   PORT=5002
   MONGO_URI=mongodb://your_mongo_url_here
   JWT_SECRET=your_super_secret_key_change_me
   GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_secret
   NODE_ENV=development
   ```

## 📍 API Endpoints

- `POST /register`: Create a new email/password account.
- `POST /login`: Standard login.
- `POST /google-login`: Exchange Google ID token for Toolza JWT.
- `GET /verify`: Validate and decode current user token.

## 📂 Folder Structure
- `/src/controllers`: Business logic (login/register).
- `/src/models`: Database schemas (User).
- `/src/routes`: API route definitions.
- `/src/config`: Database and server configuration.
