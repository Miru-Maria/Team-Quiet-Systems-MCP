# Video Script — Civic Lens Montgomery
## Target Length: 3 minutes | Format: Screen Recording with Voiceover

---

> **Recording Tips Before You Start**
> - Use **Loom** (loom.com — free tier works) for easy screen + voice recording
> - Or use **OBS Studio** (free, open source) for higher quality
> - On Mac, **QuickTime Player > New Screen Recording** works fine
> - Set your browser to 1280×720 or larger, close other tabs
> - Upload to YouTube as **Unlisted** so judges can view it with the link but it's not public
> - Title suggestion: "Civic Lens Montgomery — City of Montgomery Open Data Challenge 2026"

---

## [0:00 – 0:20] The Hook

**SHOW ON SCREEN**: Open the live dashboard at full screen. Let it load — the charts appearing is visually compelling. Don't skip this.

**SAY**:
> "Montgomery, Alabama had over 290,000 emergency 911 calls in 2025. That's a number — but what does it actually tell us? When did things get worse? What events drove the spikes? And is 2026 looking better or not?
>
> Right now, no public tool answers those questions. We built one."

---

## [0:20 – 0:45] The Problem

**SHOW ON SCREEN**: Stay on the dashboard. Slowly scroll down to show the full page — stat cards, charts, news feed, AI panel. Don't click anything yet. Let the audience absorb the scope.

**SAY**:
> "The City of Montgomery publishes its 911 call data as open data. It's real, it's live, and it's free. But raw call counts don't tell the story. Was July 2025 high because of a specific event? Was October dangerous because of one incident or a broader pattern?
>
> To answer that, you need to combine the government data with what was actually happening in the news. And then you need something to explain what it all means in plain English."

---

## [0:45 – 1:30] Live Demo Walkthrough

**SHOW ON SCREEN**: Point to the stat cards at the top one by one as you name them.

**SAY**:
> "Let me show you what we built. At the top — four key numbers. Over 41,000 emergency calls so far this year. Peak activity was July 2025. We're currently trending down 11% month over month. And average news sentiment is 'Concerning.'"

**SHOW ON SCREEN**: Scroll down slowly to the Emergency Call Volume chart.

**SAY**:
> "This is 13 months of real City of Montgomery 911 emergency call data, fetched live right now from the city's ArcGIS open data portal. You can see that summer 2025 surge clearly — July is the peak."

**SHOW ON SCREEN**: Scroll to the Context Risk Score chart.

**SAY**:
> "But here's where it gets interesting. This second chart is our Context Risk Score — a composite metric we compute by combining the normalized call volume with news sentiment. Watch what happens in October 2025."

**SHOW ON SCREEN**: Point to or hover over the October 2025 data point.

**SAY**:
> "Even though October had fewer calls than July, the context score stayed high — because October was when the mass shooting at Bibbs and Commerce Street happened during the Alabama National Fair. Two killed, twelve injured. The news sentiment collapsed, which the score captures even as the raw call count dropped."

---

## [1:30 – 2:15] Key Features Deep Dive

**SHOW ON SCREEN**: Scroll down to the News Sentiment Feed.

**SAY**:
> "This is the news sentiment feed. It pulls live Google News stories about Montgomery safety using Bright Data's scraping infrastructure. Each story is tagged with a sentiment score and tone — negative, mixed, or positive. When live results are loaded, you'll see a green 'LIVE' badge on those items."

**SHOW ON SCREEN**: Scroll to the AI Insights panel. Click "Generate Insights" and wait for results.

**SAY**:
> "And this is the AI insights panel. Powered by OpenAI — it reads all 13 months of trend data and generates a plain-English analysis in seconds. Watch this."

**SHOW ON SCREEN**: Let the bullet points and summary appear. Read the first bullet aloud or paraphrase it.

**SAY**:
> "Three bullet insights, a two-sentence summary — the kind of narrative a city council member or journalist actually needs, generated directly from the real data."

---

## [2:15 – 2:45] Architecture and Data Sources

**SHOW ON SCREEN**: Optionally switch to a simple slide or keep the dashboard visible. Speak over it.

**SAY**:
> "Everything you see is built on real, live data. The 911 call numbers come directly from the City of Montgomery's ArcGIS Open Data portal — no static export, no mocked values. The news sentiment is scraped live from Google News. The AI insights are generated fresh each time you click that button.
>
> The formula is transparent — we display it right in the dashboard. It's not a black box. Anyone can read exactly how the context score is calculated and challenge our assumptions.
>
> The app is production-ready: deployed, live, and accessible to anyone in Montgomery or anywhere else right now."

---

## [2:45 – 3:00] Close and Call to Action

**SHOW ON SCREEN**: Scroll back to the top of the dashboard so the title is visible.

**SAY**:
> "This is Stream 4 — Public Safety and City Analytics — exactly as described in the challenge brief. It's a Community Safety Lens combining real 911 data with public news trends.
>
> The same architecture can be deployed for any Alabama city in hours. The data is open. The code is open. And the insight it generates is something Montgomery's residents, journalists, and city officials can use today.
>
> Thank you."

---

## Post-Recording Checklist

- [ ] Audio is clear — no background noise
- [ ] Dashboard is visible and loaded (not in a loading state during the recording)
- [ ] All 4 key features are shown: stat cards, charts, news feed, AI insights
- [ ] AI insights are actually generated during the recording (click the button live)
- [ ] Video is between 2:30 and 3:30 minutes
- [ ] Uploaded to YouTube as Unlisted
- [ ] YouTube link copied for submission form

---

## Suggested YouTube Video Description

```
Civic Lens Montgomery
City of Montgomery Open Data Challenge 2026 — Stream 4: Public Safety & City Analytics

A real-time public safety dashboard that combines live City of Montgomery 911 emergency call data
with Google News sentiment and AI-generated insights to contextualise crime trends.

Built with: React, Node.js, OpenAI, Bright Data, City of Montgomery ArcGIS Open Data
Live app: https://civic-lens-montgomery.replit.app
Repository: https://github.com/YOUR_USERNAME/civic-lens-montgomery


Data source: City of Montgomery 911 Calls Data (ArcGIS FeatureServer, public open data)
```
