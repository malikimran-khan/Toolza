# 📂 Toolza - Image & PDF Service

The specialized processing engine of Toolza, responsible for handling all heavy media transformations.

## 📋 Features

- **PDF to Word**: Robust text extraction and `.docx` generation.
- **Image Conversion**: High-quality conversion between PNG, JPG, and WEBP.
- **Merge PDFs**: Combine multiple PDF documents into one.
- **Security**: Every route is gated by `protect` middleware to ensure only logged-in users use processing resources.

## 🛠️ Setup & Installation

1. **Navigate to directory:**
   ```bash
   cd image-pdf-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   ```env
   PORT=5001
   JWT_SECRET=your_secret_key_matching_auth_service
   NODE_ENV=development
   ```

4. **Run the service:**
   ```bash
   npm run dev
   ```

## 📍 API Endpoints

- `POST /api/pdf/to-word`: Converts PDF file to Word.
- `POST /api/pdf/merge`: Merges multiple PDF files.
- `POST /api/convert/image`: Converts images to desired formats.

## 🛡️ Authentication
This service requires an `Authorization: Bearer <token>` header on all process requests. It uses the `JWT_SECRET` to verify tokens issued by the Authentication service.
