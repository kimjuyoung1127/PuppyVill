import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";
import { Analytics } from "@shared/schema";

export default function StatsGrid() {
  const { data: analytics, isLoading } = useQuery<Analytics>({
    queryKey: ["/api/analytics", { userId: 1 }],
  });

  // Convert seconds to minutes with one decimal place
  const formatResponseTime = (seconds: number) => {
    return (seconds / 60).toFixed(1) + 'm';
  };

  // Calculate auto-response percentage
  const calculateAutoResponsePercentage = () => {
    if (!analytics) return "0%";
    return Math.round((analytics.respondedInquiries / analytics.totalInquiries) * 100) + '%';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title="Total Inquiries"
        value={analytics?.totalInquiries || 0}
        icon="ri-question-answer-line"
        iconBgColor="bg-primary-100"
        iconColor="text-primary"
        changeValue="12%"
        changeText="from last month"
        isLoading={isLoading}
      />
      
      <StatsCard
        title="Avg Response Time"
        value={analytics ? formatResponseTime(analytics.averageResponseTime) : "0m"}
        icon="ri-time-line"
        iconBgColor="bg-secondary-100"
        iconColor="text-secondary-600"
        changeValue="8%"
        changeText="faster than target"
        isLoading={isLoading}
      />
      
      <StatsCard
        title="Auto-Responses"
        value={calculateAutoResponsePercentage()}
        icon="ri-robot-line"
        iconBgColor="bg-green-100"
        iconColor="text-green-500"
        changeValue="5%"
        changeText="from last week"
        isLoading={isLoading}
      />
      
      <StatsCard
        title="Templates"
        value={Object.keys(analytics?.templateUsage || {}).length || 0}
        icon="ri-file-text-line"
        iconBgColor="bg-amber-100"
        iconColor="text-amber-500"
        changeText="Last updated 2 days ago"
        isLoading={isLoading}
      />
    </div>
  );
}
