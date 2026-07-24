# Implementation Plan — AI Content Intelligence Platform (v2, Solo Hackathon Build)

**Builder:** 1 person
**Time budget:** 22 hours
**Tool:** Antigravity (or Codex) — one stage at a time

---

## 0. Non-Negotiable Rules

1. Build stages **in order**. Don't start Stage N+1 before Stage N is tested and working.
2. Test each stage before moving on — run it, click it, confirm it does what it should.
3. Commit to git after every stage.
4. Give the coding tool **one stage per prompt**. Never paste the whole spec and say "build everything."
5. Design tokens, API shapes, and component contracts below are **fixed** once you write the code for them. Don't let the tool "improve" them mid-way — inconsistency is what makes solo builds look unpolished.

---

## 1. Final Product Scope (3 features + supporting screens)

| # | Feature | Role |
|---|---|---|
| 1 | **AI Pre-Publish Reel Reviewer** | Hero ⭐⭐⭐⭐⭐ — script in, score + suggestions out |
| 2 | **AI Research** | Support ⭐⭐⭐⭐ — topic in, trends/ideas/hooks/top-10-reels out |
| 3 | **Auto Performance Reports** | Support ⭐⭐⭐⭐ — dummy metrics logged, weekly/monthly AI report out |
| — | **History** | Support — saved past predictions, reopenable |

**User flow:**
```
Research (topic-based ideas)
   ↓
Create Content (user does this offline, outside the app)
   ↓
Predict Performance (paste script, before publish)
   ↓
Publish (offline, outside the app)
   ↓
Log Metrics (store dummy/actual performance numbers after publish)
   ↓
Weekly / Monthly AI Report (pattern insights from logged + seeded metrics)
```

---

## 2. Production vs Hackathon Tech (reference — know this cold for judge Q&A)

| Feature | Production Tech | Hackathon Tech (what we're building) |
|---|---|---|
| Reel Reviewer | Video upload → frame extraction + speech-to-text (Whisper) + vision model for visual/subtitle quality + fine-tuned scoring model trained on historical performance data | User pastes **script/transcript only** → sent to **Gemini API** with a structured rubric prompt → Gemini reasons over text and returns scores + suggestions. Visual/subtitle quality scores are **heuristic estimates from script cues** (e.g. short punchy lines = subtitle-friendly), not real frame analysis — say this clearly if asked |
| AI Research | Google Trends API + YouTube Data API + Reddit/News APIs pulling live data → Gemini summarizes real data | User types a **topic name only** → sent to **Gemini API**, which generates trends/ideas/hooks/top-10-reels from its own general knowledge — **not live web data**, a simulated-but-plausible output |
| Performance Reports | Instagram Graph API auto-fetches real metrics → stored in PostgreSQL → scheduled job (cron/n8n) → Gemini generates report | **Dummy seeded JSON** (`seedReels.json`) + any metrics user manually logs → in-memory store → Gemini generates report on button click |
| Auth / Storage | Real auth (OAuth/JWT), cloud storage (S3), PostgreSQL | None — no login, in-memory arrays / local JSON |

---

## 3. Tech Stack (fixed)

**Frontend:** React + Vite, Tailwind CSS
**Backend:** Node.js + Express
**AI:** Gemini API via one wrapper (`aiService.js`) — nothing else calls Gemini directly
**Data:** Local JSON + in-memory arrays

---

## 4. Design Tokens

```css
--color-bg: #FFFFFF;
--color-accent: #A8E6A1;
--color-accent-dark: #6FCB65;
--color-text: #1F2937;
--color-text-muted: #6B7280;
--color-border: #E5E7EB;
--shadow-soft: 0 2px 8px rgba(0,0,0,0.06);
--radius-card: 12px;
--spacing-unit: 8px;
--font-family: 'Inter', sans-serif;
```

---

## 5. Folder Structure

```
project-root/
├─ implementation.md
├─ client/
│   ├─ src/
│   │   ├─ components/
│   │   │   ├─ layout/
│   │   │   │   ├─ Navbar.jsx
│   │   │   │   └─ PageContainer.jsx
│   │   │   ├─ shared/
│   │   │   │   ├─ ScoreCard.jsx
│   │   │   │   ├─ ReadinessBadge.jsx
│   │   │   │   ├─ StrengthsWeaknessesList.jsx
│   │   │   │   ├─ SuggestedEditsChecklist.jsx
│   │   │   │   ├─ RecommendationBanner.jsx
│   │   │   │   ├─ LoadingState.jsx
│   │   │   │   └─ EmptyState.jsx
│   │   │   ├─ predictor/
│   │   │   │   ├─ InputCard.jsx
│   │   │   │   └─ ResultScreen.jsx
│   │   │   ├─ research/
│   │   │   │   ├─ TopicInputCard.jsx
│   │   │   │   ├─ TrendingTopicsList.jsx
│   │   │   │   ├─ ContentIdeasList.jsx
│   │   │   │   └─ TopReelsList.jsx
│   │   │   ├─ reports/
│   │   │   │   ├─ MetricsLogForm.jsx
│   │   │   │   ├─ MetricsTable.jsx
│   │   │   │   └─ ReportCard.jsx
│   │   │   └─ history/
│   │   │       └─ HistoryTable.jsx
│   │   ├─ pages/
│   │   │   ├─ PredictorPage.jsx
│   │   │   ├─ ResearchPage.jsx
│   │   │   ├─ ReportsPage.jsx
│   │   │   └─ HistoryPage.jsx
│   │   ├─ styles/tokens.css
│   │   └─ App.jsx
├─ server/
│   ├─ index.js
│   ├─ routes/
│   │   ├─ predict.routes.js
│   │   ├─ research.routes.js
│   │   ├─ metrics.routes.js
│   │   ├─ reports.routes.js
│   │   └─ history.routes.js
│   ├─ controllers/
│   │   ├─ predictController.js
│   │   ├─ researchController.js
│   │   ├─ metricsController.js
│   │   ├─ reportsController.js
│   │   └─ historyController.js
│   ├─ services/
│   │   ├─ aiService.js
│   │   └─ promptTemplates.js
│   ├─ data/
│   │   ├─ seedReels.json
│   │   ├─ metricsStore.js
│   │   └─ historyStore.js
│   └─ utils/
│       ├─ validateInput.js
│       └─ responseFormatter.js
```

---

## 6. API Contracts (fixed — frontend and backend must match exactly)

### `POST /api/predict` — Reel Reviewer
**Request:**
```json
{ "script": "string, required", "title": "string, optional", "niche": "string, optional" }
```
**Response:**
```json
{
  "readinessScore": 78,
  "verdict": "Strong",
  "subScores": {
    "hook": 82,
    "pacing": 70,
    "storytelling": 74,
    "visualQuality": 65,
    "subtitleQuality": 72,
    "cta": 60
  },
  "strengths": ["string", "string"],
  "weaknesses": ["string", "string"],
  "suggestedEdits": ["string", "string", "string"],
  "recommendation": "string, one sentence"
}
```
> **UI RULE:** Frontend must NOT call this until the user clicks "Predict Performance." Before that click, show `EmptyState` only — no score cards, no sub-scores, nothing. Result section renders only after a real response comes back.

### `POST /api/research` — AI Research
**Request:**
```json
{ "topic": "string, required" }
```
**Response:**
```json
{
  "trends": [
    { "topic": "string", "whyTrending": "string", "confidence": "High | Medium | Low", "suggestedAngle": "string" }
  ],
  "contentIdeas": [
    { "hook": "string", "format": "string", "difficulty": "Easy | Medium | Hard", "goal": "string" }
  ],
  "topReels": [
    { "title": "string", "hookUsed": "string", "whyItWorked": "string" }
  ],
  "summary": "string, 5-6 lines"
}
```
> Same UI rule applies: nothing shown until "Generate Research" clicked.

### `POST /api/metrics` — Log Metrics (after publish)
**Request:**
```json
{
  "title": "string, required",
  "niche": "string, optional",
  "views": "number", "likes": "number", "comments": "number", "avgWatchPercent": "number",
  "date": "YYYY-MM-DD"
}
```
**Response:** `{ "success": true, "entry": { ...same fields, "id": "string" } }`

### `GET /api/metrics` — list all logged + seeded entries (used by Reports page table)

### `POST /api/reports/weekly` and `POST /api/reports/monthly`
**Request:** `{}` (backend filters last 7 / last 30 days from combined seed + logged data)
**Response:**
```json
{
  "topPattern": "string",
  "underperformingPattern": "string",
  "trendNote": "string",
  "nextAction": "string"
}
```

### `GET /api/history` / `POST /api/history`
**GET Response:** `{ "reports": [{ "id", "title", "date", "readinessScore", "type": "predict" }] }`
**POST Request:** full predict response + `title`.

---

## 7. Component Contracts

### `<PredictorResultScreen />`
```
Props:
- data: null | { readinessScore, verdict, subScores{...6 keys}, strengths[], weaknesses[], suggestedEdits[], recommendation }
- onSave: function
Behavior: if data is null, render <EmptyState /> ONLY. If data present, render full result.
```

### `<ScoreCard />`
```
Props: label (string), value (number 0-100)
```

### `<Navbar />`
```
Props: none — links to /predictor /research /reports /history
```

---

## 8. Build Stages (one prompt per stage, test + commit after each)

### Stage 1 — Backend skeleton
Express server, folder structure, `GET /api/ping` health check.
**Test:** hit `/api/ping`, get response. **Commit.**

### Stage 2 — aiService.js
Gemini wrapper: `callGemini(promptType, payload)` → forces JSON-only response → parses and returns clean object. Add basic try/catch with a fallback error shape.
**Test:** call directly with dummy input, confirm valid parsed JSON returned. **Commit.**

### Stage 3 — Design tokens + shared components
`tokens.css`, `Navbar.jsx`, `PageContainer.jsx`, `ScoreCard.jsx`, `ReadinessBadge.jsx`, `LoadingState.jsx`, `EmptyState.jsx`.
**Test:** render each on a blank page, confirm they match design tokens visually. **Commit.**

### Stage 4 — Predictor: backend real
`predictController.js` + `predict.routes.js` + prompt template covering all 6 sub-scores (hook, pacing, storytelling, visualQuality, subtitleQuality, cta) per contract in section 6. Explicitly instruct Gemini in the prompt that visual/subtitle quality are being **estimated from script text cues**, not real video.
**Test:** send real script via Postman, confirm valid JSON matching the exact contract shape. **Commit.**

### Stage 5 — Predictor: frontend (with correct empty-state behavior)
`InputCard.jsx` + `PredictorResultScreen.jsx` + `PredictorPage.jsx`.
**Critical requirement:** on page load, result area shows ONLY `EmptyState` (e.g. "Paste your script and hit Predict to see your readiness score"). Nothing — no score cards, no placeholders with fake numbers — renders until the user clicks "Predict Performance" and a real API response comes back. Show `LoadingState` during the API call.
**Test:** load page fresh, confirm empty state only. Paste script, click predict, confirm full result appears only after response. Refresh page, confirm it resets to empty again. **Commit — this is your demo anchor.**

### Stage 6 — AI Research: backend
`researchController.js` + `research.routes.js` + prompt template instructing Gemini to generate trends/content ideas/top-10-reels for a given topic **from its own knowledge**, in the exact JSON shape from section 6.
**Test:** send a topic via Postman, confirm valid structured JSON. **Commit.**

### Stage 7 — AI Research: frontend
`TopicInputCard.jsx`, `TrendingTopicsList.jsx`, `ContentIdeasList.jsx`, `TopReelsList.jsx`, `ResearchPage.jsx`. Same empty-state rule: nothing shows until "Generate Research" is clicked.
**Test:** type a topic, generate, confirm all 3 sections render (trends, ideas, top reels) plus the summary text. **Commit.**

### Stage 8 — Seed data
`seedReels.json` — 10-15 fake logged metrics entries spread across the last ~35 days (mix of dates so weekly/monthly filters both have data to show).
**Test:** eyeball JSON shape matches metrics contract. **Commit.**

### Stage 9 — Metrics logging: backend + frontend
`metricsController.js` + `metrics.routes.js` + `metricsStore.js` (in-memory, pre-loaded from seed) + `MetricsLogForm.jsx` + `MetricsTable.jsx` on `ReportsPage.jsx`.
**Test:** log a new entry, confirm it appears in the table alongside seeded ones. **Commit.**

### Stage 10 — Reports: weekly + monthly
`reportsController.js` + `reports.routes.js` + prompt template. `ReportCard.jsx` on `ReportsPage.jsx` with a Weekly/Monthly toggle, each calling its own endpoint.
**Test:** click "Generate Weekly Report," confirm 4-section insight renders. Same for monthly. **Commit.**

### Stage 11 — History
`historyController.js` + `history.routes.js` + `historyStore.js` (pre-seeded with 2-3 entries) + `HistoryTable.jsx` + `HistoryPage.jsx`. "Save Report" button on Predictor pushes into this store; clicking a row reopens a read-only result view.
**Test:** save a prediction, confirm it shows in History and reopens correctly. **Commit.**

### Stage 12 — Polish pass
Loading states everywhere async happens, consistent spacing/colors across all 4 pages, confirm empty states are correct on every page (not just Predictor), add the line "AI-assisted prediction, not a guaranteed performance promise" visibly in the UI.
**Test:** click through the entire app top to bottom as a judge would. **Commit.**

### Stage 13 — Demo rehearsal
Practice the pitch: Research (quick) → Predictor (main anchor, spend most time here) → simulate publish → log metrics (quick) → Reports (quick) → History (quick). Time it, cut anything clunky.

---

## 9. Mock vs Real (hackathon)

| Element | Hackathon treatment |
|---|---|
| Reel Reviewer input | Script/transcript text only, no video upload |
| Visual/Subtitle quality scores | Heuristic estimate from script text via Gemini, clearly labeled as such if asked |
| Research data | Gemini's own knowledge, not live web/trend APIs |
| Performance metrics | Seeded JSON + manually logged entries, no Instagram API |
| History | In-memory, resets on server restart |
| Auth | None |

---

## 10. Hour Budget (22 hours)

| Stage | Hours |
|---|---|
| 1. Backend skeleton | 0.5 |
| 2. aiService.js | 1.5 |
| 3. Shared components | 2.5 |
| 4. Predictor backend | 2 |
| 5. Predictor frontend (empty-state critical) | 2.5 |
| 6. Research backend | 1.5 |
| 7. Research frontend | 2 |
| 8. Seed data | 0.5 |
| 9. Metrics logging | 2 |
| 10. Reports (weekly+monthly) | 2.5 |
| 11. History | 1.5 |
| 12. Polish | 2.5 |
| 13. Demo rehearsal | 1 |

---

## 11. If Time Runs Short — Cut In This Order

1. Monthly report toggle → keep weekly only, mention monthly as "same engine, different window"
2. History → replace with 2-3 static pre-seeded cards, skip the real save flow
3. Top 10 reels in Research → cut to top 5
4. Metrics manual logging form → keep only seeded data, skip live add

**Never cut:** Predictor's empty-state-until-clicked behavior, Predictor visual polish, the "AI-assisted, not guaranteed" disclaimer line.
