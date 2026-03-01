# Procurement Paul 🤝

> AI-powered end-to-end tender writing platform — part of the **HR Henry Ecosystem**

---

## 🚀 Build Progress

| Stage | Status | Description |
|-------|--------|-------------|
| ✅ Stage 1 | **Complete** | Project scaffold, GitHub setup, tech stack |
| ✅ Stage 2 | **Complete** | Full UI — landing page, dashboard, navigation |
| ✅ Stage 3 | **Complete** | Tenders list, tender detail editor, new tender wizard |
| ✅ Stage 4 | **Complete** | Knowledge base, analytics, auth pages |
| ✅ Stage 5 | **Complete** | Supabase database schema (all tables + RLS policies) |
| 🔄 Stage 6 | *Next* | OpenAI integration — document analysis + AI response generation |
| ⏳ Stage 7 | *Planned* | Real Supabase data wiring (replace mock data) |
| ⏳ Stage 8 | *Planned* | File upload to Supabase Storage |
| ⏳ Stage 9 | *Planned* | Subscription/billing (Stripe) |
| ⏳ Stage 10 | *Planned* | Deployment (Vercel) |

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **AI:** OpenAI API (GPT-4o)
- **Icons:** Lucide React
- **Deployment:** Vercel (planned)

---

## 🎨 Design

- **Colour scheme:** Professional deep navy (`#1e3a5f`) + gold accent (`#c9a84c`)
- **Font:** Inter
- Clean, structured UI optimised for tender writers

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── page.tsx                    ✅ Landing page
│   ├── auth/
│   │   ├── login/page.tsx          ✅ Login
│   │   └── register/page.tsx       ✅ Register
│   ├── dashboard/
│   │   ├── layout.tsx              ✅ Sidebar + nav
│   │   └── page.tsx                ✅ Dashboard home
│   ├── tenders/
│   │   ├── page.tsx                ✅ Tenders list
│   │   ├── new/page.tsx            ✅ New tender wizard (4-step)
│   │   └── [id]/page.tsx           ✅ Tender editor with AI generation
│   ├── knowledge-base/
│   │   └── page.tsx                ✅ Knowledge base
│   └── analytics/
│       └── page.tsx                ✅ Analytics dashboard
├── lib/
│   ├── supabase.ts                 ✅ Supabase client
│   └── utils.ts                    ✅ Utility functions
└── types/
    └── index.ts                    ✅ TypeScript types

supabase/
└── migrations/
    └── 001_initial_schema.sql      ✅ Full DB schema
```

---

## ⚡ Quick Start

### 1. Clone and install

```bash
git clone https://github.com/HR-HENRY/procurement-paul.git
cd procurement-paul
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — from your Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project settings
- `OPENAI_API_KEY` — from platform.openai.com

### 3. Database setup

Run `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Key Features Built

### Landing Page
- Professional hero section with value proposition
- Feature grid (6 features)
- How it works (4 steps)
- Pricing tiers (Starter £49/m, Professional £149/m, Enterprise custom)

### Dashboard
- Live stats (active tenders, win rate, avg score)
- Recent tenders with status + deadline urgency
- Quick actions panel
- "Paul's Tip" coaching widget
- Quarterly performance tracker

### New Tender Wizard (4 steps)
1. **Upload** — drag & drop tender documents
2. **Details** — title, client, deadline, value, type
3. **Analysis** — AI parsing simulation with extracted sections
4. **Review** — summary and launch

### Tender Editor
- Section-by-section response writer
- Word count with visual limit tracker
- **AI generation** per section (OpenAI ready)
- Knowledge base reference button
- Scoring guidance panel (per section)
- Spec reference mapping
- Progress tracking

### Knowledge Base
- Document library (profiles, case studies, KPIs, Q&As, certificates)
- Category filtering
- Tag system
- Usage tracking ("used in X tenders")

### Analytics
- Win rate, total value, average score
- Monthly bar chart
- Section performance breakdown with improvement tips
- Recent wins log

### Database (Supabase)
- `profiles` — user accounts
- `tenders` — tender records
- `tender_documents` — uploaded files
- `tender_sections` — extracted questions + responses
- `knowledge_documents` — company knowledge base
- `qa_library` — reusable Q&A entries
- `appendices` — evidence documents
- Full Row Level Security (RLS) on all tables
- Auto-updating `updated_at` triggers

---

## 📋 Next Up (Stage 6)

- [ ] OpenAI document analysis API route (`/api/analyse-tender`)
- [ ] AI response generation API route (`/api/generate-response`)
- [ ] Wire real Supabase data into all pages
- [ ] File upload to Supabase Storage
- [ ] Auth flow (login/register → dashboard)

---

*Built by Procurement Paul AI · Part of the HR Henry Ecosystem*
