# 🏆 Demo Pitch & Rehearsal Guide (3-Minute Hackathon Presentation)

**Application:** AI Content Intelligence Platform (v2)  
**Target Time:** 2 mins 45 secs – 3 minutes max

---

## 🎬 1. The Demo Flow (Step-by-Step)

### Step 1: AI Research (30 seconds)
1. Navigate to **AI Research** (`/research`).
2. Point out the clean **Empty State** card ("No research generated yet").
3. Click the popular topic pill **`AI Tools`** or type `"AI Productivity Tools"`.
4. Click **Generate Research**.
5. **What to say:**
   > *"Before creating content, creators need to know what's trending. Our AI Research engine generates high-converting subtopics, 3-second hooks, and viral reel concepts tailored to any niche. Creators can copy winning hooks with one click."*

---

### Step 2: AI Pre-Publish Reel Reviewer (Main Anchor — 90 seconds) ⭐
1. Navigate to **Reel Reviewer** (`/predictor`).
2. **Highlight the Empty State:**
   > *"Notice that before inputting a script, the result section is completely empty — no fake placeholders or misleading scores."*
3. Click **Insert Sample Script** (or paste your script text).
4. Click **Predict Performance**.
5. Walk through the results:
   - **Publish Readiness Score & Verdict Badge** (e.g., `78/100 - Strong`).
   - **Key Recommendation Banner**.
   - **6 Sub-Score Breakdown:** `Hook (3s)`, `Delivery & Pacing`, `Storytelling`, `Visual Quality (Est.)`, `Subtitle Readiness`, `Call to Action`.
   - **Strengths & Weaknesses List**.
   - **Actionable Suggested Edits Checklist**.
6. Click **Save Prediction**.
7. **What to say:**
   > *"This is our hero feature — the AI Reel Reviewer. It analyzes short-form scripts against algorithmic engagement factors before you hit publish. It scores the script across 6 critical dimensions, including heuristic estimations for visual and subtitle quality based on text formatting cues."*

---

### Step 3: Performance Metrics & Logging (20 seconds)
1. Navigate to **Performance Reports** (`/reports`).
2. Show the **Logged Performance History** table (seeded with 12 realistic entries across 35 days).
3. Click **Log New Reel Performance**, enter a title (e.g. `"My New AI Reel"`), fill sample metrics (e.g. 25,000 views, 1,800 likes, 78% watch rate), and click **Save Metric**.
4. **What to say:**
   > *"After publishing offline, creators log their actual reel performance data alongside our historical seed dataset."*

---

### Step 4: Weekly & Monthly AI Intelligence Reports (20 seconds)
1. On **Performance Reports**, click **Generate Weekly Report**.
2. Highlight the 4-section insight output:
   - **Top Performing Pattern**
   - **Underperforming Pattern**
   - **Audience & Retention Trend**
   - **Highest-Impact Next Action**
3. Switch toggle to **Monthly (30 Days)** and generate.
4. **What to say:**
   > *"Our report engine aggregates all logged metrics to spot macro performance patterns, identifying what content formats drive higher retention and providing one clear, actionable next step."*

---

### Step 5: Saved History & Reopen View (20 seconds)
1. Navigate to **History** (`/history`).
2. Point out the newly saved prediction alongside past evaluations.
3. Click **Reopen** on any row.
4. Show the original script preview and read-only scorecard.
5. **What to say:**
   > *"All evaluations can be saved and reopened at any time for iterative script editing and retrospective comparison."*

---

## 🎯 2. Judge Q&A Cheat Sheet

| Judge Question | Bulletproof Response |
|---|---|
| **"How are visual & subtitle scores calculated without video?"** | *"Visual and subtitle scores are heuristic estimates derived from script text cues — such as scene transition tags, sentence brevity, and visual direction formatting. In a production build, this would ingest raw video frames via Whisper + vision models."* |
| **"Is the research pulling live web data?"** | *"For the hackathon scope, Gemini generates structured trend and hook intelligence directly from its parametric knowledge. In production, we would connect Google Trends, YouTube Data, and Instagram Graph APIs."* |
| **"How is performance data stored?"** | *"Data is stored in-memory and initialized via a seeded JSON store (`seedReels.json`) covering 35 days of sample metrics."* |

---

## 🚀 3. How to Run Locally

### Start Backend Server:
```bash
cd server
npm start
# Runs on http://localhost:5000
```

### Start Frontend Client:
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```
