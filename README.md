# AI-Powered Smart Agriculture Assistant

Fieldwise is a farmer-focused agriculture assistant for crop questions, irrigation planning, soil health and possible crop issue identification. Farmers can share crop, growth stage, location and an optional crop photo. The assistant sends that context to Google Gemini through the project server and can reply in English or Bangla.

## Requirements

- Node.js 20.19+ or 22.12+
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Setup

```bash
npm install
cp .env.example .env
```

Put the API key in `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
```

Start the frontend and API server together:

```bash
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`. The server reads `.env` and keeps the Gemini key on the server; do not put provider keys in frontend files or commit `.env`.

## Production

Build the frontend and start the API server, which also serves the built app:

```bash
npm run build
npm start
```

The production server listens on port `3001` by default. Set `PORT` to change it.

## API

- `GET /api/health` reports whether the Gemini key is configured.
- `POST /api/advice` accepts `question`, `crop`, `stage`, `region`, `language` and an optional `{ "data": "base64-image", "mimeType": "image/jpeg" }` image.

The API validates request size and image types, applies a response timeout, and returns a user-facing error when the provider is unavailable. The model is instructed to distinguish likely causes from confirmed diagnoses, avoid unsafe pesticide dosing, and refer high-risk decisions to local agriculture experts. Advice is educational and should be checked against local expertise and product labels.

## Project Checks

```bash
npm run build
npm run lint
```
