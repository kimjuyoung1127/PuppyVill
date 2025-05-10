import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { PrivacySettings } from "@shared/schema";

export function usePrivacySettings(userId: number) {
  const queryClient = useQueryClient();
  
  // Fetch privacy settings
  const { 
    data: privacySettings, 
    isLoading, 
    error 
  } = useQuery<PrivacySettings>({
    queryKey: ["/api/privacy-settings", { userId }],
  });

  // Update privacy settings
  const updatePrivacySettings = useMutation({
    mutationFn: async (data: Partial<PrivacySettings>) => {
      const response = await apiRequest("PUT", "/api/privacy-settings", {
        ...data,
        userId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/privacy-settings"] });
    },
  });

  // Export user data
  const exportData = async () => {
    try {
      const response = await fetch(`/api/export-data?userId=${userId}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to export data");
      }
      
      const data = await response.json();
      
      // Create a downloadable file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `responder-pro-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error("Error exporting data:", error);
      throw error;
    }
  };

  // Get privacy status summary
  const getPrivacySummary = () => {
    if (!privacySettings) return null;
    
    const enabledFeatures = [
      privacySettings.storeClientData ? "Data Storage" : null,
      privacySettings.emailTracking ? "Email Tracking" : null,
      privacySettings.dataEncryption ? "Encryption" : null,
      privacySettings.anonymousAnalytics ? "Anonymous Analytics" : null,
    ].filter(Boolean);
    
    const privacyScore = enabledFeatures.length === 4 ? "High" :
                         enabledFeatures.length >= 2 ? "Medium" : "Low";
    
    return {
      enabledFeatures,
      privacyScore,
      retentionPeriod: privacySettings.dataRetentionPeriod,
      noticeType: privacySettings.privacyNoticeType,
    };
  };

  return {
    privacySettings,
    isLoading,
    error,
    updatePrivacySettings: updatePrivacySettings.mutate,
    isPending: updatePrivacySettings.isPending,
    exportData,
    privacySummary: getPrivacySummary(),
  };
}
