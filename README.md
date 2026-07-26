# Mayo Labs - Cook Better Content

Reelytics is an AI-powered content intelligence layer for short-form video creators (Reels/Shorts). It helps marketing teams and creators answer three questions: **Should we publish this?**, **What should we make next?**, and **What patterns are working over time?**

Built as a hackathon MVP — this is a focused demo, not a production system. See [Scope & Limitations](#scope--limitations) below for exactly what's real vs. simulated.

---

## Features

### 🎯 Predict — AI Pre-Publish Reel Reviewer
Paste a script or transcript before publishing and get an AI-generated readiness score, sub-scores (Hook, Pacing, Storytelling, Visual Quality, Subtitle Quality, CTA), strengths, weaknesses, and specific suggested edits.

### 🔍 Research — AI Content Research
Enter a topic and get AI-generated trending angles, content ideas (hook + format + difficulty + goal), and example top-performing reel concepts to guide what to create next.

### 📊 Reports — Auto Performance Reports
Log post-publish metrics and generate weekly/monthly AI-written performance summaries — top-performing patterns, underperforming patterns, and next-step recommendations.

### 📚 History
Browse and reopen previously saved Predictor reports.

### 💬 AI Assistant (Chat)
A scoped chat assistant, accessible from the navbar, that can discuss your most recent Predictor result or Research report (tag one at a time) to help you iterate on scripts and ideas conversationally. Session-only — chat history resets on refresh.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite, Tailwind CSS |
| Backend | Node.js + Express |
| AI | Google Gemini API |
| Data | Local JSON / in-memory storage (no database) |

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A [Gemini API key](https://ai.google.dev/) from Google AI Studio

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Set up environment variables
Create a `.env` file in the `server/` directory:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### 3. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Run the app
```bash
# Terminal 1 — backend
cd server
npm run dev

# Terminal 2 — frontend
cd client
npm run dev
```

The app will be available at `http://localhost:5173` (frontend), with the backend running on `http://localhost:5000` (or your configured `PORT`).

---

## Project Structure

```
project-root/
├─ client/          # React + Vite frontend
│  └─ src/
│     ├─ components/
│     ├─ pages/
│     └─ styles/
├─ server/           # Node + Express backend
│  ├─ routes/
│  ├─ controllers/
│  ├─ services/       # aiService.js — single Gemini API wrapper
│  ├─ data/           # seed data + in-memory stores
│  └─ utils/
└─ implementation.md  # full technical spec used to build this project
```

---

## Scope & Limitations

This is a hackathon MVP built to demonstrate the product concept. A few things are intentionally simulated rather than fully built out:

| Feature | Hackathon version | Production version would use |
|---|---|---|
| Reel Reviewer | Script/transcript text input only | Real video upload, speech-to-text, frame/vision analysis |
| AI Research | Gemini's own knowledge for a given topic | Live data from Google Trends, YouTube, Reddit, News APIs |
| Performance Reports | Seeded + manually logged dummy metrics | Real metrics via Instagram Graph API |
| Auth | None | Full user authentication |
| Data persistence | In-memory (resets on server restart) | PostgreSQL / cloud database |

The AI Assistant is a decision-support tool — outputs are AI-generated guidance, not guarantees of content performance.

---

## Disclaimer

Reelytics provides AI-assisted predictions and feedback to support content decisions. It is not a guarantee of virality or performance.
