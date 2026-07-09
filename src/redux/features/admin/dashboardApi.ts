import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewStats: builder.query<any, void>({
      query: () => "/dashboard/overview",
      providesTags: ["Booking", "Withdraw", "Profile", "Admin"],
    }),
    getAnalyticsStats: builder.query<any, void>({
      query: () => "/dashboard/analytics",
      providesTags: ["Booking", "Admin"],
    }),
    getAIInsights: builder.query<any, void>({
      query: () => "/dashboard/ai-insights",
      providesTags: ["Admin"],
    }),
  }),
});

export const { 
  useGetOverviewStatsQuery, 
  useGetAnalyticsStatsQuery, 
  useGetAIInsightsQuery 
} = dashboardApi;
