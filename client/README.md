# 💻 Toolza - React Frontend

The premium user interface of the Toolza platform. Built with React, TypeScript, and Tailwind CSS for a high-performance experience.

## 📋 Features

- **Modern UI**: Polished design using Glassmorphism and Lucide icons.
- **Microservice Integration**: Communicates with multiple backends through the central API Gateway.
- **Auth Guard**: Protected routes and UI states ensure an account-first experience.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.

## 🛠️ Setup & Installation

1. **Navigate to directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🛰️ API Configuration
The frontend uses a **Vite Proxy** found in `vite.config.ts`. All `/api` and `/r` requests are automatically forwarded to the **API Gateway (Port 8000)**. This avoids CORS issues and simplifies deployment.

## 📂 Key Folders
- `/src/components`: Reusable UI elements (Navbar, AuthModal).
- `/src/pages`: Page-level components.
- `/src/lib`: Core logic and API axios setup.
