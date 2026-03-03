# Assault Trend Contextualizer for Montgomery
## City of Montgomery Open Data Challenge — Submission Document

**Challenge Stream**: 4 — Public Safety, Emergency Response & City Analytics
**Solution Type**: Production-Ready (live data, fully deployed)
**Submission Date**: March 2026
**Team**: [Your Name / Team Name]
**Live Application**: https://assault-trend-contextualizer.replit.app
**Repository**: https://github.com/YOUR_USERNAME/assault-trend-contextualizer

---

## 1. Executive Summary

Montgomery, Alabama recorded over 290,000 emergency 911 calls in 2025. Behind those numbers are stories — a summer shooting surge, a mass casualty event at the Alabama National Fair, policy responses, and community grief. Yet no public-facing tool connects those call volume signals to the news events, community sentiment, and patterns that give them meaning.

The **Assault Trend Contextualizer for Montgomery** is a real-time public safety intelligence dashboard that closes that gap. It is the only tool that:

- Fetches **live 911 emergency call data** directly from the City of Montgomery's ArcGIS Open Data portal
- Enriches that data with **live news sentiment** scraped from Google News via Bright Data
- Computes a **Context Risk Score** — a composite metric blending normalized call volume with sentiment risk
- Generates **AI-powered plain-language insights** explaining what the data actually means

The result is a dashboard that transforms raw government data into actionable community intelligence — built on real Montgomery datasets, deployed today, accessible to anyone with a browser.

---

## 2. Challenge Stream Alignment (Criterion 1 — 15 points)

### Direct Match: Stream 4 — Public Safety, Emergency Response & City Analytics

The challenge brief describes Stream 4 as: *"Design responsible analytics using alerts, news, and incident patterns to add context to safety data, like 'Community Safety Lens' combining 911 reports with public trends."*

Our application is a precise implementation of this vision, built with real Montgomery data rather than simulated or placeholder values.

### How Every Requirement Maps to Our Solution

| Stream 4 Criterion | Our Implementation |
|---|---|
| Use City of Montgomery datasets | City of Montgomery 911 Call Data (ArcGIS FeatureServer, publicly accessible) |
| Responsible analytics | Context Score formula is transparent, documented, and displayed in the UI |
| Alerts + incident patterns | 13-month trend line with annotated peak events |
| Add context to safety data | News sentiment feed enriches call volume with why spikes occurred |
| Public trends enrichment | Bright Data live Google News scrape for Montgomery crime/safety stories |
| Community-facing | Publicly deployed, no login required, designed for non-technical audiences |

### The Specific City of Montgomery Dataset

The primary dataset powering this application is:

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

## 3. Quality and Design (Criterion 2 — 10 points)

### Design Philosophy

The dashboard was designed around three guiding principles:

**1. Data clarity over decoration** — every visual element exists to communicate a specific data point. Charts use labeled axes, reference lines for peak events, and clear legends. Color is used semantically (red for risk, green for improvement, amber for caution).

**2. Progressive disclosure** — the top of the page shows the four most important numbers at a glance (total calls, peak month, trend, sentiment). Scrolling reveals the trend charts. The AI insights panel requires an intentional button click, placing detailed analysis where users who want it can find it without overwhelming those who do not.

**3. Trust signals** — a "Live Open Data" badge in the header, explicit data source attribution at the bottom, and the displayed context score formula build credibility with informed users while remaining accessible to general audiences.

### Visual Components

| Component | Purpose | Design Decision |
|---|---|---|
| Stat Cards (×4) | Immediate KPI overview | Color-coded variants: positive/negative/warning |
| Emergency Call Volume Area Chart | Show 13-month call trend | Area fill communicates volume weight; reference line marks peak |
| Context Risk Score Line Chart | Show composite risk + sentiment | Dual Y-axis removed in favor of normalized 0-1 scale for clarity |
| AI Insights Panel | Plain-language explanation | Bullet + summary format, generated on demand to respect API costs |
| News Sentiment Feed | Show why spikes happened | Sentiment bar + tone badge per item; LIVE badge for Bright Data items |
| Context Score Formula | Build formula transparency | Displayed inline in footer card, with plain-English explanation |

### Codebase Quality

- **TypeScript end-to-end**: shared types in `shared/schema.ts` prevent frontend/backend mismatches
- **Proper caching**: 15-minute cache for ArcGIS data, 30-minute cache for news, background refresh for Bright Data (non-blocking)
- **Error resilience**: every API call has a documented fallback — Bright Data failure falls back to curated static data; ArcGIS failure returns a 500 with a clear message
- **Test IDs on all interactive elements**: `data-testid` attributes on every button, card, and dynamic element support automated testing
- **No mocked data in production**: the `REAL_NEWS_EVENTS` fallback array contains 14 real, sourced Montgomery news events — not placeholder Lorem ipsum

---

## 4. Originality and Impact (Criterion 3 — 10 points)

### What Doesn't Exist Today

No existing public tool for Montgomery — or most mid-sized American cities — combines:

1. Live government 911 call data
2. Real-time news sentiment from a verified scraping source
3. A composite risk score with a documented formula
4. AI-generated plain-language interpretation

The City of Montgomery's open data portal provides the raw numbers. Local news outlets cover individual incidents. Police press releases respond to specific events. But nothing synthesizes all three streams into a single, continuously updated view.

Existing commercial alternatives (e.g., ShotSpotter, PredPol) are expensive, controversial in their use of predictive modeling, and opaque in their methods. This tool uses only publicly available data, shows its formula openly, and positions itself as a contextualizer — not a predictor.

### Responsible Design Choices

The tool is deliberately named an "Assault Trend Contextualizer" rather than a "Crime Predictor." It:

- Does not identify individuals or locations within the city
- Does not use arrest or conviction data (which carries racial bias risk)
- Displays the formula it uses so users can evaluate it
- Uses aggregate monthly data, not incident-level granularity
- Frames findings as "context" and "trend" rather than "prediction" or "risk score for specific residents"

### Meaningful Impact at Scale

If this tool were operated city-wide and updated daily:

**For city officials**: Monthly context score trend lines give budget and policy decision-makers a synthesized view of public safety trajectory — without needing to request custom reports from multiple departments.

**For journalists**: The news sentiment feed and AI insights panel give local reporters a starting point for investigating whether specific incidents are part of a pattern or isolated events.

**For residents**: A plain-English dashboard they can check as easily as a weather app gives residents a factual basis for conversations about safety — countering misinformation and rumor.

**For grant applications**: Cities applying for federal public safety funding (e.g., COPS grants, ARPA public safety allocations) need to demonstrate data-driven problem identification. This tool generates exactly the visualisations and narrative summaries those applications require.

### Scale Potential

The architecture is city-agnostic. Replacing the ArcGIS dataset URL and the Google News search query is the only change required to deploy this for Birmingham, Huntsville, Mobile, or any other city with a public 911 call dataset. The Bright Data news scraping and OpenAI insight generation are already parameterised. A multi-city version could serve as a statewide Alabama public safety intelligence platform.

---

## 5. Commercialisation Potential (Criterion 4 — 5 points)

### The Market Opportunity

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
- Target: local news organisations, university criminology departments, policy think tanks

**Tier 3 — Insurance & Real Estate Data Feed ($10,000–$50,000/year)**
- Aggregated risk score data for underwriting and property assessment
- Historical trend API
- Target: regional insurers, commercial real estate firms

### Cost Structure

The marginal cost to operate is low:
- ArcGIS open data: free (public endpoint)
- Bright Data scraping: ~$0.004/record (highly affordable at this data volume)
- OpenAI API: ~$0.01–$0.05 per insight generation
- Hosting: $20–$100/month on Replit or equivalent

A city paying $5,000/year covers approximately 50x the infrastructure cost at current usage levels.

### Path to Revenue

1. **Month 1-3**: Demonstrate value with Montgomery as a free pilot; collect usage data and testimonials
2. **Month 4-6**: Approach Birmingham and Huntsville city councils with a live demo
3. **Month 7-12**: SaaS product launch with standardised onboarding for mid-sized Alabama cities
4. **Year 2**: Expand to other southeastern US states; build API for journalism and research verticals

---

## 6. Technical Architecture

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
| Hosting | Replit |

### API Reference

| Endpoint | Method | Cache | Description |
|---|---|---|---|
| `/api/trend-data` | GET | 15 min | ArcGIS 911 data + context scores |
| `/api/news-items` | GET | 30 min | Live Bright Data news + sentiment |
| `/api/insights` | POST | None | OpenAI analysis of trend data |

---

## 7. Appendix — Dataset Citation

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
