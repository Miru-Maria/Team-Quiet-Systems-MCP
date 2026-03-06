import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle, TrendingUp, TrendingDown, Phone, Brain,
  Newspaper, RefreshCw, Info, MapPin, Calendar, Activity,
  ExternalLink, Shield, BarChart2, Sun, Moon
} from "lucide-react";
import type { TrendDataResponse, NewsItem, Insight, MonthlyData } from "@shared/schema";

function StatCard({
  label, value, sub, icon: Icon, variant = "default", testId
}: {
  label: string;
  value: string;
  sub?: string;
  icon: any;
  variant?: "default" | "warning" | "positive" | "negative";
  testId: string;
}) {
  const colorMap = {
    default: "text-foreground",
    warning: "text-amber-600 dark:text-amber-400",
    positive: "text-emerald-600 dark:text-emerald-400",
    negative: "text-red-600 dark:text-red-400",
  };

  return (
    <Card data-testid={testId} className="flex-1 min-w-0">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-2xl font-bold leading-tight ${colorMap[variant]}`} data-testid={`${testId}-value`}>{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className={`p-2 rounded-md bg-muted ${colorMap[variant]}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SentimentBadge({ score }: { score: number }) {
  if (score >= 0.2) return <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">Positive</Badge>;
  if (score >= -0.2) return <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">Neutral</Badge>;
  if (score >= -0.6) return <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Concerning</Badge>;
  return <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Critical</Badge>;
}

function SentimentBar({ score }: { score: number }) {
  const pct = Math.round(((score + 1) / 2) * 100);
  const color = score >= 0.2 ? "bg-emerald-500" : score >= -0.2 ? "bg-amber-500" : score >= -0.6 ? "bg-orange-500" : "bg-red-500";
  return (
    <div className="w-16 bg-muted rounded-full h-1.5 flex-shrink-0">
      <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-card-border rounded-md p-3 shadow-lg text-sm">
      <p className="font-semibold mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }} />
          {p.name}: <span className="font-medium">{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </p>
      ))}
    </div>
  );
};

const ContextTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const ctx = payload.find((p: any) => p.name === "Context Score");
  const sent = payload.find((p: any) => p.name === "Sentiment");
  return (
    <div className="bg-card border border-card-border rounded-md p-3 shadow-lg text-sm">
      <p className="font-semibold mb-2">{label}</p>
      {ctx && <p style={{ color: ctx.color }}>Context Score: <span className="font-medium">{ctx.value}</span></p>}
      {sent && <p style={{ color: sent.color }}>News Sentiment: <span className="font-medium">{sent.value}</span></p>}
    </div>
  );
};

export default function Dashboard() {
  const [insightsGenerated, setInsightsGenerated] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const trendQuery = useQuery<TrendDataResponse>({
    queryKey: ["/api/trend-data"],
  });

  const newsQuery = useQuery<NewsItem[]>({
    queryKey: ["/api/news-items"],
  });

  const insightsMutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await apiRequest("POST", "/api/insights", body);
      return res.json();
    },
    onSuccess: () => setInsightsGenerated(true),
  });

  const handleGenerateInsights = () => {
    if (!trendQuery.data) return;
    insightsMutation.mutate({
      data: trendQuery.data.data,
      stats: trendQuery.data.stats,
    });
  };

  const stats = trendQuery.data?.stats;
  const chartData = trendQuery.data?.data ?? [];
  const peakMonth = stats?.peakMonth;
  const insights: Insight | null = insightsMutation.data ?? null;

  const trendVariant = (stats?.trendPercent ?? 0) > 5 ? "negative" : (stats?.trendPercent ?? 0) < -5 ? "positive" : "default";
  const sentVariant = (stats?.avgSentiment ?? 0) >= 0 ? "positive" : (stats?.avgSentiment ?? 0) >= -0.4 ? "warning" : "negative";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold leading-tight" data-testid="text-app-title">
                Civic Lens Montgomery
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Montgomery, Alabama
              </p>
              <p className="text-xs text-muted-foreground italic">
                Turning crime data into civic intelligence.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs gap-1 hidden sm:flex">
              <Activity className="w-3 h-3" />
              Live Open Data
            </Badge>
            {stats && (
              <p className="text-xs text-muted-foreground hidden md:block">
                Updated {new Date(stats.lastUpdated).toLocaleTimeString()}
              </p>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              data-testid="button-theme-toggle"
              className="h-8 w-8"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Data Source Banner */}
        <div className="flex items-start gap-3 p-3 rounded-md bg-primary/5 border border-primary/20">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-medium text-foreground">Data Source: </span>
            <span className="text-muted-foreground">
              City of Montgomery 911 Emergency Call Volume — retrieved in real-time from the
              Montgomery ArcGIS Open Data Portal (services7.arcgis.com). Web sentiment derived
              from verified local news reports and enriched with AI interpretation.
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-3">
          {trendQuery.isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="flex-1 min-w-[180px]">
                <CardContent className="p-5">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))
          ) : stats ? (
            <>
              <StatCard
                label="Total Emergency Calls (This Year)"
                value={stats.totalCallsThisYear.toLocaleString()}
                sub={`Avg ${stats.avgMonthlyCallsThisYear.toLocaleString()} / month`}
                icon={Phone}
                testId="stat-total-calls"
              />
              <StatCard
                label="Peak Activity Month"
                value={stats.peakMonth}
                sub={`${stats.peakCount.toLocaleString()} emergency calls`}
                icon={Calendar}
                variant="warning"
                testId="stat-peak-month"
              />
              <StatCard
                label="Month-over-Month Trend"
                value={`${stats.trendPercent > 0 ? "+" : ""}${stats.trendPercent}%`}
                sub="Emergency call volume change"
                icon={stats.trendPercent >= 0 ? TrendingUp : TrendingDown}
                variant={trendVariant}
                testId="stat-trend"
              />
              <StatCard
                label="Avg News Sentiment"
                value={stats.avgSentiment >= 0 ? "Moderately Positive" : stats.avgSentiment >= -0.4 ? "Concerning" : "Highly Negative"}
                sub={`Score: ${stats.avgSentiment} (range −1 to +1)`}
                icon={Newspaper}
                variant={sentVariant}
                testId="stat-sentiment"
              />
            </>
          ) : trendQuery.isError ? (
            <div className="w-full p-4 text-center text-destructive flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Failed to load data from Montgomery open data portal.
            </div>
          ) : null}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Emergency Call Volume Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-primary" />
                    Emergency Call Volume Over Time
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Monthly 911 Emergency calls — City of Montgomery open data
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {trendQuery.isLoading ? (
                <Skeleton className="h-64 w-full rounded-md" />
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="callGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {peakMonth && (
                      <ReferenceLine
                        x={peakMonth}
                        stroke="hsl(var(--destructive))"
                        strokeDasharray="4 2"
                        label={{ value: "Peak", position: "insideTopLeft", fontSize: 10, fill: "hsl(var(--destructive))" }}
                      />
                    )}
                    <Area
                      type="monotone"
                      dataKey="callCount"
                      name="Emergency Calls"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      fill="url(#callGradient)"
                      dot={{ r: 3, fill: "hsl(var(--chart-1))", strokeWidth: 0 }}
                      activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Context Score Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Context Risk Score Over Time
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  Combined score: emergency volume (55%) + news sentiment risk (45%)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {trendQuery.isLoading ? (
                <Skeleton className="h-64 w-full rounded-md" />
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 1]}
                      tickFormatter={(v) => v.toFixed(1)}
                    />
                    <Tooltip content={<ContextTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: "11px", paddingTop: "4px" }}
                    />
                    <ReferenceLine
                      y={0.7}
                      stroke="hsl(var(--destructive))"
                      strokeDasharray="4 2"
                      label={{ value: "High Risk", position: "right", fontSize: 10, fill: "hsl(var(--destructive))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="contextScore"
                      name="Context Score"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "hsl(var(--chart-2))", strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sentimentScore"
                      name="Sentiment"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={1.5}
                      strokeDasharray="5 3"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row: AI Insights + News Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* AI Insights Panel */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription className="text-xs">
                Pattern analysis powered by OpenAI — interpreting real Montgomery data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!insightsGenerated && !insightsMutation.isPending && (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click below to generate AI insights about assault trends and key spikes in Montgomery.
                  </p>
                  <Button
                    data-testid="button-generate-insights"
                    onClick={handleGenerateInsights}
                    disabled={!trendQuery.data || trendQuery.isLoading}
                    className="w-full"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Insights
                  </Button>
                </div>
              )}

              {insightsMutation.isPending && (
                <div className="space-y-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyzing trend data with AI...
                  </div>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-md" />
                  ))}
                </div>
              )}

              {insights && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {insights.bullets.map((bullet, i) => (
                      <div
                        key={i}
                        data-testid={`text-insight-${i}`}
                        className="flex items-start gap-3 p-3 rounded-md bg-muted/60"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{i + 1}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{bullet}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="p-3 rounded-md bg-card border border-card-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Summary</p>
                    <p className="text-sm leading-relaxed" data-testid="text-insight-summary">{insights.summary}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Peak: {insights.peakMonth} | Trend: {insights.trend}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      data-testid="button-regenerate-insights"
                      onClick={handleGenerateInsights}
                      disabled={insightsMutation.isPending}
                      className="h-7 px-2 text-xs"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Refresh
                    </Button>
                  </div>
                </div>
              )}

              {insightsMutation.isError && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  Failed to generate insights. Please try again.
                </div>
              )}
            </CardContent>
          </Card>

          {/* News Sentiment Feed */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-primary" />
                Web News Sentiment Feed
              </CardTitle>
              <CardDescription className="text-xs">
                Real news events from Montgomery enriched with sentiment scoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              {newsQuery.isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-md" />
                  ))}
                </div>
              ) : newsQuery.data ? (
                <div
                  className="space-y-1 overflow-y-auto pr-1"
                  style={{ maxHeight: "360px" }}
                  data-testid="list-news-items"
                >
                  {newsQuery.data
                    .slice()
                    .reverse()
                    .map((item, i) => (
                      <div
                        key={i}
                        data-testid={`news-item-${i}`}
                        className="flex items-start gap-3 p-3 rounded-md bg-muted/40 hover-elevate cursor-pointer group"
                        onClick={() => item.url && window.open(item.url, "_blank")}
                      >
                        <div className="flex-shrink-0 text-center w-10 pt-0.5">
                          <span className="text-xs font-semibold text-muted-foreground block">
                            {item.date.slice(0, 7)}
                          </span>
                          {(item as any).live && (
                            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wide block mt-0.5">
                              LIVE
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-snug line-clamp-2">{item.headline}</p>
                          {(item as any).source && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {(item as any).source}
                            </p>
                          )}
                          {(item as any).description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 opacity-75">
                              {(item as any).description}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end gap-1">
                          <SentimentBadge score={item.sentiment} />
                          <SentimentBar score={item.sentiment} />
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground text-sm py-8">
                  No news data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Context Score Formula */}
        <Card>
          <CardContent className="py-4 px-5">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Context Score Formula:</span>
              </div>
              <code className="text-xs bg-muted px-3 py-1.5 rounded-md font-mono">
                context_score = (normalized_call_volume × 0.55) + (sentiment_risk × 0.45)
              </code>
              <span className="text-muted-foreground text-xs">
                where sentiment_risk = 1 − ((sentiment + 1) / 2) — higher score = greater community concern
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pb-4">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Data: City of Montgomery ArcGIS Open Data Portal · Sentiment: Verified local news sources
          </div>
          {stats && (
            <a
              href="https://opendata.montgomeryal.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline underline-offset-2"
            >
              opendata.montgomeryal.gov <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
