import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { PrivacySettings } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function PrivacyControls() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: privacySettings, isLoading } = useQuery<PrivacySettings>({
    queryKey: ["/api/privacy-settings", { userId: 1 }],
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: Partial<PrivacySettings>) => {
      const response = await apiRequest(
        "PUT", 
        "/api/privacy-settings", 
        { ...updatedSettings, userId: 1 }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/privacy-settings"] });
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been updated successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update settings",
        description: error.message || "An error occurred while updating your privacy settings.",
        variant: "destructive",
      });
    },
  });

  const handleToggle = (setting: keyof PrivacySettings) => {
    if (!privacySettings) return;
    
    updateSettingsMutation.mutate({
      [setting]: !privacySettings[setting],
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Privacy Controls</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48 mt-1" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Skeleton className="h-5 w-full" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Privacy Controls</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Store Client Data</p>
              <p className="text-xs text-gray-500 mt-0.5">Save inquiry information</p>
            </div>
            <Toggle
              pressed={privacySettings?.storeClientData}
              onPressedChange={() => handleToggle("storeClientData")}
              aria-label="Toggle store client data"
              disabled={updateSettingsMutation.isPending}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Email Tracking</p>
              <p className="text-xs text-gray-500 mt-0.5">Monitor when emails are opened</p>
            </div>
            <Toggle
              pressed={privacySettings?.emailTracking}
              onPressedChange={() => handleToggle("emailTracking")}
              aria-label="Toggle email tracking"
              disabled={updateSettingsMutation.isPending}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Data Encryption</p>
              <p className="text-xs text-gray-500 mt-0.5">End-to-end encryption</p>
            </div>
            <Toggle
              pressed={privacySettings?.dataEncryption}
              onPressedChange={() => handleToggle("dataEncryption")}
              aria-label="Toggle data encryption"
              disabled={updateSettingsMutation.isPending}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Anonymous Analytics</p>
              <p className="text-xs text-gray-500 mt-0.5">Share data without identifiers</p>
            </div>
            <Toggle
              pressed={privacySettings?.anonymousAnalytics}
              onPressedChange={() => handleToggle("anonymousAnalytics")}
              aria-label="Toggle anonymous analytics"
              disabled={updateSettingsMutation.isPending}
            />
          </div>
        </div>
        
        <Link href="/privacy-settings">
          <Button 
            variant="outline" 
            className="w-full mt-4 flex items-center justify-center"
            disabled={updateSettingsMutation.isPending}
          >
            <i className="ri-shield-keyhole-line mr-1.5"></i>
            <span>Advanced Privacy Settings</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
