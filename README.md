# 🌱 BizGrow — Gamified AI Micro-Loan Incubator

BizGrow is a hackathon project built at HackCMU to empower rural entrepreneurs with access to financial literacy, mentorship, and business planning tools.  
Through simple, gamified quests (like logging sales, uploading crop photos, or interviewing customers), users earn XP + BizCoins, level up from *Dreamer → Loan-Ready*, and unlock a personalized AI-generated business plan in their local language.  

Our mission: make micro-finance and rural business growth **fun, accessible, and community-driven**.

---

## 🚀 Features
- **Quest System** — Log income/expenses, upload shop photos, complete micro-quizzes.
- **Eligibility Score** — Transparent, explainable score (0–100) showing loan readiness.
- **Gamification** — Levels, XP, BizCoins, leaderboards, and unlockable tips.
- **Business Plan Generator** — AI-powered 1-page plan with fallback templates.
- **Community Tools** — Cooperative quests, mentorship reflections, and village leaderboards.
- **Admin Dashboard** — Review submissions, approve/deny quests, and recompute scores.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 14 (App Router) + Tailwind + shadcn/ui
- **Backend:** Next.js API Routes + Supabase (Postgres, Auth, Storage)
- **Auth:** Email OTP (no social login)
- **AI:** Plan generation endpoint (LLM with safe fallback templating)
- **i18n:** English + local language JSON dictionaries

---

## ⚡ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-org>/bizgrow.git
cd bizgrow
npm install
npm run dev
