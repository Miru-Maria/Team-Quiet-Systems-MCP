# Civic Lens Montgomery

*Turning crime data into civic intelligence.*

> A real-time public safety intelligence dashboard that enriches City of Montgomery 911 emergency call data with live news sentiment and AI-generated insights — giving residents, journalists, and city officials a clearer picture of community safety trends.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Deployed-brightgreen)](https://civic-lens-montgomery.replit.app)

**Live App: https://civic-lens-montgomery.replit.app**

[![Challenge Stream](https://img.shields.io/badge/Challenge%20Stream-Public%20Safety%20%26%20Analytics-red)](https://github.com)

[![Data Source](https://img.shields.io/badge/Data%20Source-City%20of%20Montgomery%20ArcGIS-blue)](https://opendata.montgomeryal.gov)

[![Built With](https://img.shields.io/badge/Built%20With-React%20%7C%20Node.js%20%7C%20OpenAI%20%7C%20Bright%20Data-purple)](https://github.com)

---

## Challenge Stream

**Stream 4 — Public Safety, Emergency Response & City Analytics**

> "Design responsible analytics using alerts, news, and incident patterns to add context to safety data, like 'Community Safety Lens' combining 911 reports with public trends."

This application is a direct implementation of the challenge's suggested archetype: it combines real Montgomery 911 call volume data with live Google News scraping to generate a **Context Risk Score** — a composite metric no existing public tool provides.

---

## What It Does

The dashboard answers one question city leaders and residents actually ask: **"Is Montgomery getting safer or more dangerous — and what's driving the change?"**

It does this by:

1. Fetching **live 911 emergency call volume** from the City of Montgomery's ArcGIS Open Data portal (13 months of real data)
2. Scraping **live Google News** for Montgomery crime and safety stories via Bright Data
3. Computing a **Context Risk Score** that blends normalized call volume with news sentiment
4. Generating **AI-powered natural language insights** using OpenAI GPT to explain the patterns
5. Presenting everything in an **interactive dashboard** with charts, stat cards, and a news sentiment feed

---

## Live Dashboard Features

| Feature | Description |
|---|---|
| Emergency Call Volume Chart | Area chart of monthly 911 call volume (Jan 2025–present) |
| Context Risk Score Timeline | Composite score (0–1) combining call volume + news sentiment |
| AI Insights Panel | On-demand GPT analysis of trend patterns with bullet points |
| News Sentiment Feed | Live Google News stories tagged with sentiment tone |
| Stat Cards | Total calls, peak month, month-over-month trend, avg sentiment |
| Live Open Data Badge | Confirms data is fetched in real time, not mocked |

---

## Context Risk Score Formula

```
context_score = (normalized_call_volume × 0.55) + (sentiment_risk × 0.45)

where:
  normalized_call_volume = (month_calls - min_calls) / (max_calls - min_calls)
  sentiment_risk         = 1 - ((sentiment_score + 1) / 2)
```

A score of `1.0` means maximum concern (peak call volume + maximally negative news sentiment). A score of `0.0` means lowest concern. The October 2025 mass shooting at Bibbs and Commerce Streets produced the highest single-month sentiment risk spike in the dataset.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                            │
│              React Dashboard (Recharts + Shadcn)            │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP
┌──────────────────────────▼──────────────────────────────────┐
│                   EXPRESS.JS API SERVER                     │
│                                                             │
│  GET /api/trend-data  ──►  ArcGIS FeatureServer (live)      │
│                            Montgomery 911 Call Volume        │
│                            Context Score Computation         │
│                                                             │
│  GET /api/news-items  ──►  Bright Data DCA Collector         │
│                            Google News (live scrape)         │
│                            Fallback: curated static array    │
│                                                             │
│  POST /api/insights   ──►  OpenAI GPT-4                     │
│                            Natural language analysis         │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Sources

| Source | Type | URL |
|---|---|---|
| City of Montgomery 911 Call Data | Live ArcGIS FeatureServer | `services7.arcgis.com/xNUwUjOJqYE54USz/ArcGIS/rest/services/911_Calls_Data/FeatureServer/0` |
| Google News (Montgomery crime) | Live via Bright Data DCA | `news.google.com/search?q=Montgomery+Alabama+assault+crime` |
| OpenAI GPT | AI text generation | Via Replit AI Integrations |

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Recharts (data visualisation)
- Shadcn UI + Tailwind CSS
- TanStack Query (server state)
- Wouter (routing)

**Backend**
- Node.js + Express
- Bright Data DCA API (live news scraping)
- OpenAI Chat Completions API

**Infrastructure**
- Replit (hosting + secrets management)
- City of Montgomery ArcGIS Open Data Portal

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Miru-Maria/Team-Quiet-Systems-MCP/
cd Team-Quiet-Systems-MCP

# 2. Install dependencies
npm install

# 3. Set environment variables
# Create a .env file or set in your environment:
BRIGHTDATA_API_KEY=your_brightdata_api_key
BRIGHTDATA_DATASET_ID=your_dataset_id
OPENAI_API_KEY=your_openai_key   # or use Replit AI Integrations

# 4. Run the development server
npm run dev
# App starts on http://localhost:5000
```

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/trend-data` | GET | Live ArcGIS 911 call data + context scores (15-min cache) |
| `/api/news-items` | GET | Live news items from Bright Data (30-min cache, background refresh) |
| `/api/insights` | POST | OpenAI-generated bullet insights + summary |

---

## Key Data Findings

From the live dataset (Jan 2025 – Feb 2026):

- **Peak month**: July 2025 with **28,973 emergency calls** (summer crime surge)
- **Highest risk context score**: July 2025 at **0.93/1.00**
- **Notable event**: October 2025 mass shooting at Alabama National Fair — 2 killed, 12 injured — produced the sharpest single-event sentiment spike
- **Current trend**: February 2026 shows -11% month-over-month, lowest call volume in the dataset at 19,466

---

## Screenshots

<img width="1243" height="730" alt="image" src="https://github.com/user-attachments/assets/235fa459-8c0b-412b-a548-a1194716e2d6" />
<img width="1247" height="867" alt="image" src="https://github.com/user-attachments/assets/383b3114-7b2e-4fb4-977f-73794a549bb3" />
<img width="1243" height="886" alt="image" src="https://github.com/user-attachments/assets/23dfc543-e955-42f6-8a95-a1ebd3d938b6" />


---

## Submission Details

- **Hackathon**: City of Montgomery Open Data Challenge
- **Challenge Stream**: Public Safety, Emergency Response & City Analytics
- **Solution Type**: Production-ready (deployed, live data, no mocked values)
- **Team**: Miruna Cristiana Paun / Team Quiet Systems MCP

---

## License

MIT — built for the City of Montgomery Open Data Challenge.
