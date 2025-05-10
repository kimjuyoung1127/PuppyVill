import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Analytics } from "@shared/schema";

export function useAnalytics(userId: number) {
  const queryClient = useQueryClient();
  
  // Fetch user analytics
  const { data: analytics, isLoading, error } = useQuery<Analytics>({
    queryKey: ["/api/analytics", { userId }],
  });

  // Update analytics data
  const updateAnalytics = useMutation({
    mutationFn: async (data: Partial<Analytics>) => {
      const response = await apiRequest("PUT", "/api/analytics", {
        ...data,
        userId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
    },
  });

  // Calculate formatted analytics metrics
  const getFormattedMetrics = () => {
    if (!analytics) return null;
    
    // Calculate response rate
    const responseRate = analytics.totalInquiries > 0
      ? (analytics.respondedInquiries / analytics.totalInquiries) * 100
      : 0;
    
    // Format average response time
    const avgResponseTimeMinutes = analytics.averageResponseTime / 60;
    const formattedResponseTime = avgResponseTimeMinutes.toFixed(1) + 'm';
    
    // Format inquiry type breakdown for charts
    const inquiryTypeChartData = Object.entries(analytics.inquiryTypeBreakdown || {}).map(
      ([name, value]) => ({ name, value })
    );
    
    // Template usage data for charts
    const templateUsageChartData = Object.entries(analytics.templateUsage || {}).map(
      ([id, count]) => ({ id: parseInt(id), count })
    );
    
    return {
      responseRate: Math.round(responseRate),
      formattedResponseTime,
      inquiryTypeChartData,
      templateUsageChartData,
    };
  };

  return {
    analytics,
    isLoading,
    error,
    updateAnalytics: updateAnalytics.mutate,
    isPending: updateAnalytics.isPending,
    metrics: getFormattedMetrics(),
  };
}
