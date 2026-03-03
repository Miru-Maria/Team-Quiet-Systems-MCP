# Assault Trend Contextualizer for Montgomery

A real-time data dashboard that contextualizes assault and emergency incident trends in Montgomery, AL using live open data from the City of Montgomery and AI-powered analysis.

## Architecture

- **Frontend**: React + TypeScript + Recharts + Shadcn UI (Vite dev server)
- **Backend**: Express.js API server (port 5000)
- **AI**: OpenAI via Replit AI Integrations (no user API key required)

## Data Sources

### Primary Data (Real-time)
- **City of Montgomery ArcGIS Open Data Portal** — 911 Emergency Call Volume
- Service URL: `https://services7.arcgis.com/xNUwUjOJqYE54USz/ArcGIS/rest/services/911_Calls_Data/FeatureServer/0/query`
- Data: Monthly Emergency 911 call counts (Jan 2025 - present)

### Web Sentiment Enrichment
- 14 verified news events from Montgomery, AL (2025-2026)
- Each event has a sentiment score from -1 (very negative) to +1 (very positive)
- Sources include: local police dept, Alabama Law Enforcement Agency, local news coverage
- Notable events include the October 2025 downtown mass shooting (2 killed, 12 injured)

### Context Score Formula
```
context_score = (normalized_call_volume × 0.55) + (sentiment_risk × 0.45)
where: sentiment_risk = 1 - ((sentiment + 1) / 2)
```
Higher score = greater community safety concern.

## API Endpoints

- `GET /api/trend-data` — Fetches real-time data from Montgomery ArcGIS, computes context scores, returns monthly timeline (15-minute cache)
- `GET /api/news-items` — Returns 14 real news events with sentiment scores
- `POST /api/insights` — OpenAI-generated analysis: 3 bullet insights + summary based on trend data

## Key Features

1. **Real Montgomery Open Data** — fetched live from ArcGIS FeatureServer
2. **Emergency Call Volume Timeline** — area chart with peak month annotation
3. **Context Risk Score Timeline** — dual-line chart combining call volume + news sentiment
4. **AI Insights Panel** — on-demand OpenAI analysis of trend patterns
5. **News Sentiment Feed** — 14 verified news events with sentiment badging and external links
6. **Stat Dashboard** — total calls this year, peak month, trend %, average sentiment

## Project Structure

```
client/src/
  pages/Dashboard.tsx   # Main dashboard page
  App.tsx               # Router setup
  
server/
  routes.ts             # API endpoints (trend data, news, insights)
  openai.ts             # OpenAI client via Replit AI Integrations
  index.ts              # Express server entry point
  
shared/
  schema.ts             # TypeScript types for the app
```

## Running

The app auto-starts via the "Start application" workflow using `npm run dev`, which runs Express + Vite concurrently on port 5000.
