import { z } from "zod";

export const monthlyDataSchema = z.object({
  date: z.string(),
  year: z.number(),
  month: z.number(),
  callCount: z.number(),
  sentimentScore: z.number(),
  contextScore: z.number(),
  normalizedCalls: z.number(),
  normalizedSentiment: z.number(),
});

export const newsItemSchema = z.object({
  headline: z.string(),
  date: z.string(),
  sentiment: z.number(),
  url: z.string().optional(),
});

export const insightSchema = z.object({
  bullets: z.array(z.string()),
  summary: z.string(),
  peakMonth: z.string(),
  trend: z.string(),
});

export const trendDataResponseSchema = z.object({
  data: z.array(monthlyDataSchema),
  stats: z.object({
    totalCallsThisYear: z.number(),
    avgMonthlyCallsThisYear: z.number(),
    peakMonth: z.string(),
    peakCount: z.number(),
    latestMonthCallCount: z.number(),
    trendPercent: z.number(),
    avgSentiment: z.number(),
    dataSource: z.string(),
    lastUpdated: z.string(),
  }),
});

export type MonthlyData = z.infer<typeof monthlyDataSchema>;
export type NewsItem = z.infer<typeof newsItemSchema>;
export type Insight = z.infer<typeof insightSchema>;
export type TrendDataResponse = z.infer<typeof trendDataResponseSchema>;
