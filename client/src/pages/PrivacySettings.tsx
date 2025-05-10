import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import DataPrivacy from "@/components/privacy/DataPrivacy";
import { PrivacySettings as PrivacySettingsType } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Privacy settings schema with validation
const privacySchema = z.object({
  storeClientData: z.boolean(),
  emailTracking: z.boolean(),
  dataEncryption: z.boolean(),
  anonymousAnalytics: z.boolean(),
  dataRetentionPeriod: z.string(),
  privacyNoticeType: z.string(),
  includeDataExportOption: z.boolean(),
});

type PrivacyFormValues = z.infer<typeof privacySchema>;

export default function PrivacySettings() {
  const [activeTab, setActiveTab] = useState("settings");
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: privacySettings, isLoading } = useQuery<PrivacySettingsType>({
    queryKey: ["/api/privacy-settings", { userId: 1 }],
  });

  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      storeClientData: true,
      emailTracking: true,
      dataEncryption: true,
      anonymousAnalytics: false,
      dataRetentionPeriod: "90 days",
      privacyNoticeType: "short",
      includeDataExportOption: true,
    },
  });

  // Update form when data is loaded
  React.useEffect(() => {
    if (privacySettings) {
      form.reset({
        storeClientData: privacySettings.storeClientData,
        emailTracking: privacySettings.emailTracking,
        dataEncryption: privacySettings.dataEncryption,
        anonymousAnalytics: privacySettings.anonymousAnalytics,
        dataRetentionPeriod: privacySettings.dataRetentionPeriod,
        privacyNoticeType: privacySettings.privacyNoticeType,
        includeDataExportOption: privacySettings.includeDataExportOption,
      });
    }
  }, [privacySettings, form]);

  const updatePrivacyMutation = useMutation({
    mutationFn: async (data: PrivacyFormValues) => {
      const response = await apiRequest("PUT", "/api/privacy-settings", {
        ...data,
        userId: 1,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/privacy-settings"] });
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been updated successfully.",
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

  const onSubmit = (data: PrivacyFormValues) => {
    updatePrivacyMutation.mutate(data);
  };

  // Handle export data
  const handleExportData = async () => {
    try {
      const response = await fetch(`/api/export-data?userId=1`, {
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
      
      toast({
        title: "Data exported",
        description: "Your data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to export data",
        description: "An error occurred while exporting your data.",
        variant: "destructive",
      });
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Privacy Controls</h1>
          <p className="text-sm text-gray-500 mt-1">Manage data privacy and security settings</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center" onClick={handleExportData}>
            <i className="ri-download-2-line mr-1.5"></i>
            <span>Export All Data</span>
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
          <TabsTrigger value="info">Privacy Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="mt-6">
          {isLoading ? (
            <Card>
              <CardHeader>
                <CardTitle>Privacy Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-full max-w-md mt-1" />
                      <div className="flex items-center justify-between mt-2">
                        <Skeleton className="h-6 w-full max-w-md" />
                        <Skeleton className="h-6 w-10 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Collection & Storage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="storeClientData"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Store Client Data</FormLabel>
                            <FormDescription>
                              Save inquiry information for future reference
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataRetentionPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Retention Period</FormLabel>
                          <FormDescription>
                            How long client data will be stored before automatic deletion
                          </FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select retention period" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="30 days">30 days</SelectItem>
                              <SelectItem value="60 days">60 days</SelectItem>
                              <SelectItem value="90 days">90 days</SelectItem>
                              <SelectItem value="180 days">180 days</SelectItem>
                              <SelectItem value="1 year">1 year</SelectItem>
                              <SelectItem value="Custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Security & Privacy Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="dataEncryption"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Data Encryption</FormLabel>
                            <FormDescription>
                              Enable end-to-end encryption for all stored data
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="emailTracking"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Tracking</FormLabel>
                            <FormDescription>
                              Track when clients open your response emails
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="anonymousAnalytics"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Anonymous Analytics</FormLabel>
                            <FormDescription>
                              Share anonymized data for service improvements
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Client-Facing Privacy Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="privacyNoticeType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Privacy Notice in Responses</FormLabel>
                          <FormDescription>
                            Type of privacy statement to include in automated responses
                          </FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select notice type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full">Full privacy notice</SelectItem>
                              <SelectItem value="short">Short privacy notice</SelectItem>
                              <SelectItem value="link">Link to privacy policy</SelectItem>
                              <SelectItem value="none">No privacy notice</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="includeDataExportOption"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Data Export Option</FormLabel>
                            <FormDescription>
                              Include an option for clients to request their data
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updatePrivacyMutation.isPending || !form.formState.isDirty}
                  >
                    {updatePrivacyMutation.isPending ? "Saving..." : "Save Settings"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </TabsContent>
        
        <TabsContent value="info" className="mt-6">
          <DataPrivacy />
        </TabsContent>
      </Tabs>
    </div>
  );
}
