# Civic Lens Montgomery

## City of Montgomery Open Data Challenge — Submission Document

**Challenge Stream**: 4 — Public Safety, Emergency Response & City Analytics

**Solution Type**: Production-Ready (live data, fully deployed)

**Submission Date**: March 7 2026

**Team**: Team Quiet Systems MCP

**Live Application**: https://civic-lens-montgomery.replit.app

**Repository**: https://github.com/Miru-Maria/Team-Quiet-Systems-MCP

---

## Scoring Summary

| Criterion | Max Points | Notes |
|---|---|---|
| Consistency with Challenge Statements | 10 | Most important criterion |
| Quality and Design | 10 | Algorithm, code, and design quality |
| Originality | 5 | Differentiation from market alternatives |
| Social Value / Impact | 5 | Value to society at large |
| Commercialization | 5 | Commercial opportunity potential |
| **Bright Data Bonus** | **+3** | Automatic for using Bright Data product |
| **Total Possible** | **38** | |

---

## 1. Executive Summary

Montgomery, Alabama recorded over 290,000 emergency 911 calls in 2025. Behind those numbers are stories — a summer shooting surge, a mass casualty event at the Alabama National Fair, policy responses, and community grief. Yet no public-facing tool connects those call volume signals to the news events, community sentiment, and patterns that give them meaning.

**Civic Lens Montgomery** is a real-time public safety intelligence dashboard that closes that gap. It is the only tool that:

- Fetches **live 911 emergency call data** directly from the City of Montgomery's ArcGIS Open Data portal
- Enriches that data with **live news sentiment** scraped from Google News via Bright Data
- Computes a **Context Risk Score** — a composite metric blending normalized call volume with sentiment risk
- Generates **AI-powered plain-language insights** explaining what the data actually means

The result is a dashboard that transforms raw government data into actionable community intelligence — built on real Montgomery datasets, deployed today, accessible to anyone with a browser.

Tagline: *"Turning crime data into civic intelligence."*

---

## 2. Consistency with Challenge Statements (Criterion 1 — /10)

### Public Safety, Emergency Response & City Analytics

The challenge brief explicitly calls for solutions that: *"Analyze and improve insights from 911 data"* and *"Compare crime statistics with public perception and messaging."* My application does both simultaneously, in real time.

The challenge also names Bright Data as a suggested tool, through Replit I integrated Bright Data's DCA collector to scrape live Google News stories about Montgomery safety.

### How Every Requirement Maps to my Solution

| Challenge Area | My Implementation |
|---|---|
| City of Montgomery Data Portal | Live 911 Call Data via ArcGIS FeatureServer (public endpoint) |
| Bright Data web scraping | Google News scrape for Montgomery crime/safety stories (background DCA job) |
| AI, automation, or intelligent agents | OpenAI GPT generates plain-language insights from the trend data |
| Turn real-world data into useful tools | Dashboard is deployed, live, and accessible to any resident today |
| Analyze 911 data insights | 13-month trend analysis with month-over-month comparison |
| Compare crime stats with public perception | Context Risk Score blends call volume with news sentiment |

### The Dataset specific to the City of Montgomery 

**911 Calls Data — City of Montgomery ArcGIS Open Data Portal**
- Service: `https://services7.arcgis.com/xNUwUjOJqYE54USz/ArcGIS/rest/services/911_Calls_Data/FeatureServer/0`
- Fields used: `Year`, `Month`, `Call_Count_By_Origin`, `Call_Category`, `Call_Origin`
- Filter applied: `Call_Category='Emergency' AND Call_Origin='Incoming'`
- Coverage: January 2025 to present (13 months of real data at submission time)
- Access: Public, no authentication required
- Refresh: Live — fetched on each user session (15-minute server-side cache)

This is not a static export or a mocked dataset. Every number shown on the dashboard was fetched from the City of Montgomery's infrastructure seconds before being displayed.

### What the Data Reveals

The live dataset shows patterns that matter for public safety planning:

- **Summer surge**: July 2025 recorded 28,973 emergency calls — the highest single month in the dataset, 49% above the February 2026 low
- **Mass casualty impact**: October 2025 recorded the most negative news sentiment in the dataset, driven by the Bibbs and Commerce Street mass shooting (2 killed, 12 injured during the Alabama National Fair)
- **Current trajectory**: February 2026 shows 19,466 calls — an 11% month-over-month decline, and the lowest figure in the 13-month dataset, suggesting early 2026 downward trend

These findings emerge automatically from the live data pipeline — they are not manually entered.

---

## 3. Quality and Design (Criterion 2 — /10)

### Design Philosophy

The dashboard was designed around three guiding principles:

**1. Data clarity over decoration** — every visual element exists to communicate a specific data point. Charts use labeled axes, reference lines for peak events, and clear legends. Color is used semantically (red for risk, green for improvement, amber for caution). Light and Dark Modes are also available and easy to toggle between.

**2. Progressive disclosure** — the top of the page shows the four most important numbers at a glance (total calls, peak month, trend, sentiment). Scrolling reveals the trend charts. The AI insights panel requires an intentional button click, placing detailed analysis where users who want it can find it without overwhelming those who do not.

**3. Trust signals** — a "Live Open Data" badge in the header, explicit data source attribution, and the displayed context score formula near the page footer all build credibility with informed users while remaining accessible to general audiences.

### Visual Components

| Component | Purpose | Design Decision |
|---|---|---|
| Stat Cards (×4) | Immediate KPI overview | Color-coded variants: positive/negative/warning |
| Emergency Call Volume Area Chart | Show 13-month call trend | Area fill communicates volume weight; reference line marks peak |
| Context Risk Score Line Chart | Show composite risk + sentiment | Normalized 0–1 scale for interpretability |
| AI Insights Panel | Plain-language explanation | Bullet + summary format, generated on demand |
| News Sentiment Feed | Show why spikes happened | Sentiment bar + tone badge per item; LIVE badge for Bright Data items |
| Context Score Formula | Build formula transparency | Displayed inline in footer card with plain-English explanation |

### Context Risk Score Formula

```
context_score = (normalized_call_volume × 0.55) + (sentiment_risk × 0.45)

where:
  normalized_call_volume = (month_calls − min_calls) / (max_calls − min_calls)
  sentiment_risk         = 1 − ((sentiment_score + 1) / 2)
```

### Codebase Quality

- **TypeScript end-to-end**: shared types in `shared/schema.ts` prevent frontend/backend mismatches
- **Proper caching**: 15-minute cache for ArcGIS data, 30-minute cache for news, background non-blocking refresh for Bright Data
- **Error resilience**: every API call has a documented fallback — Bright Data failure falls back to curated static data; ArcGIS failure returns a clear error message
- **No mocked data in production**: the fallback news array contains 14 real, sourced Montgomery news events — not placeholder content
- **Built with Replit**: rapid prototyped and deployed using Replit, with permission from the hackathon organizers

---

## 4. Originality (Criterion 3 — /5)

### What Doesn't Exist Today

No existing public tool for Montgomery — or most mid-sized American cities — combines:

1. Live government 911 call data
2. Real-time news sentiment from a verified scraping source
3. A composite risk score with a documented, transparent formula
4. AI-generated plain-language interpretation

The City of Montgomery's open data portal provides the raw numbers. Local news outlets cover individual incidents. Police press releases respond to specific events. But nothing synthesizes all three streams into a single, continuously updated view.

Existing commercial alternatives (e.g., ShotSpotter, PredPol) are expensive, controversial in their use of predictive modeling, and opaque in their methods. Civic Lens uses only publicly available data, shows its formula openly, and positions itself as a contextualizer — not a predictor.

### Responsible Design Choices

The tool is deliberately named "Civic Lens" rather than a "Crime Predictor." It:

- Does not identify individuals or specific locations within the city
- Does not use arrest or conviction data (which carries racial bias risk)
- Displays the formula it uses so users can evaluate and challenge our assumptions
- Uses aggregate monthly data, not incident-level granularity
- Frames findings as "context" and "trend" rather than "prediction"

---

## 5. Social Value / Impact (Criterion 4 — /5)

### Who Benefits and How

**City officials**: Monthly context score trendlines which give budget and policy decision-makers a synthesized view of public safety trajectory, without needing to request custom reports from multiple departments.

**Journalists**: The news sentiment feed and AI insights panel give local reporters a starting point for investigating whether specific incidents are part of a pattern or isolated events.

**Residents**: A plain-English dashboard which residents can check as easily as a weather app, that gives them a factual basis for conversations about safety, countering misinformation and rumors.

**Grant applications**: Cities applying for federal public safety funding (e.g., COPS grants, ARPA public safety allocations) need to demonstrate data-driven problem identification. This tool generates exactly the visualizations and narrative summaries those applications require.

### Scale Potential

The architecture is city-agnostic. Replacing the ArcGIS dataset URL and the Google News search query is the only change required to deploy this for Birmingham, Huntsville, Mobile, or any other city with a public 911 call dataset. A multi-city version could serve as a statewide Alabama public safety intelligence platform or be adapted to any country that publishes emergency call open data.

---

## 6. Commercialization (Criterion 5 — /5)

### Market Opportunity

The public safety analytics market is large and underserved at the city government level. Large cities use expensive enterprise platforms. Mid-sized cities like Montgomery (population ~200,000) lack the budget for enterprise tools and the technical staff to build their own. This is the addressable market.

### Revenue Model

**Tier 1 — City Government SaaS License ($2,000–$8,000/year per city)**
- White-labelled dashboard hosted for the city
- Daily data refresh (vs. the current 15-minute cache)
- Custom branding and city-specific metric definitions
- PDF report generation for council meetings and press releases
- Estimated: 10 cities at $5,000/year = $50,000 ARR within 12 months

**Tier 2 — Journalism & Research Subscription ($500–$2,000/year)**
- API access to the context score time series
- News sentiment feed via webhook
- Custom search queries (beyond assault — traffic, housing, environment)
- Target: local news organizations, university criminology departments, policy think tanks

**Tier 3 — Insurance & Real Estate Data Feed ($10,000–$50,000/year)**
- Aggregated risk score data for underwriting and property assessment
- Historical trend API
- Target: regional insurers, commercial real estate firms

### Cost Structure

The marginal cost to operate is very low:
- ArcGIS open data: free (public endpoint)
- Bright Data scraping: ~$0.004/record (highly affordable at this data volume)
- OpenAI API: ~$0.01–$0.05 per insight generation
- Hosting: $20–$100/month on Replit or equivalent

A city paying $5,000/year covers approximately 50× the infrastructure cost at current usage levels.

### Path to Revenue

1. **Month 1-3**: Demonstrate value with Montgomery as a free pilot; collect usage data and testimonials
2. **Month 4-6**: Approach Birmingham and Huntsville city councils with a live demo
3. **Month 7-12**: SaaS product launch with standardized onboarding for mid-sized Alabama cities
4. **Year 2**: Expand to other southeastern US states; build API for journalism and research verticals

---

## 7. Bright Data Integration (Bonus — +3 points)

Civic Lens Montgomery uses Bright Data's DCA (Data Collector API) to scrape live Google News stories about Montgomery crime and safety. This integration:

- Triggers automatically 3 seconds after server startup (non-blocking background job)
- Scrapes `news.google.com/search?q=Montgomery+Alabama+assault+crime` via collector `c_mmaxvsv714xslv250f`
- Polls for results using the Bright Data DCA dataset endpoint
- On success, replaces the static news feed with live scraped items tagged with a green "LIVE" badge
- Falls back gracefully to a curated static array of 14 verified Montgomery news events if the scrape is unavailable

This qualifies for the automatic 3-point Bright Data bonus per the challenge rules.

---

## 8. Technical Architecture

### Data Pipeline

```
City of Montgomery ArcGIS (live)
    ↓
Monthly Emergency Call Aggregation
    ↓
Min-Max Normalization
    ↓
Context Score Engine
    (normalized_calls × 0.55) + (sentiment_risk × 0.45)
    ↓
Dashboard Rendering (React + Recharts)
    +
Bright Data Google News (background scrape)
    → Sentiment Feed
    +
OpenAI GPT (on demand)
    → AI Insights
```

### Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Recharts, Shadcn UI, Tailwind CSS |
| State Management | TanStack Query (server state), React useState |
| Routing | Wouter |
| Backend | Node.js, Express |
| AI | OpenAI GPT via Replit AI Integrations |
| News Scraping | Bright Data DCA API (collector c_mmaxvsv714xslv250f) |
| Primary Dataset | City of Montgomery ArcGIS FeatureServer |
| Hosting | Replit (with organizer permission) |

### API Reference

| Endpoint | Method | Cache | Description |
|---|---|---|---|
| `/api/trend-data` | GET | 15 min | ArcGIS 911 data + context scores |
| `/api/news-items` | GET | 30 min | Live Bright Data news + sentiment |
| `/api/insights` | POST | None | OpenAI analysis of trend data |

---

## 9. Appendix — Dataset Citation

**Primary Dataset**
City of Montgomery 911 Calls Data
- Publisher: City of Montgomery, Alabama
- Portal: City of Montgomery Open Data / ArcGIS Online
- Service URL: `https://services7.arcgis.com/xNUwUjOJqYE54USz/ArcGIS/rest/services/911_Calls_Data/FeatureServer/0`
- Access: Public (no authentication required)
- Fields used: Year, Month, Call_Count_By_Origin, Call_Category, Call_Origin
- Filter: Emergency calls, incoming origin only
- Coverage: January 2025 – February 2026 (13 months)

**Secondary Data Source**
Google News — Montgomery Alabama assault crime
- Access method: Bright Data DCA collector (c_mmaxvsv714xslv250f)
- Query: `Montgomery Alabama assault crime`
- Locale: en-US / US:en
- Result fields: title, link, source, publication_date, description

**AI Analysis**
OpenAI GPT (gpt-5.1)
- Usage: Generating bullet insights and narrative summaries from aggregated trend data
- Input: Monthly call counts, context scores, sentiment scores, statistical summaries
- Output: 3 bullet insights + 2-sentence summary
