import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { PrivacySettings } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Advanced privacy settings schema
const privacySchema = z.object({
  dataRetentionPeriod: z.string(),
  privacyNoticeType: z.string(),
  includeDataExportOption: z.boolean(),
});

type PrivacyFormValues = z.infer<typeof privacySchema>;

export default function DataPrivacy() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: privacySettings, isLoading } = useQuery<PrivacySettings>({
    queryKey: ["/api/privacy-settings", { userId: 1 }],
  });

  const defaultRetentionPeriod = privacySettings?.dataRetentionPeriod || "90 days";
  const defaultNoticeType = privacySettings?.privacyNoticeType || "short";
  const defaultExportOption = privacySettings?.includeDataExportOption ?? true;

  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      dataRetentionPeriod: defaultRetentionPeriod,
      privacyNoticeType: defaultNoticeType,
      includeDataExportOption: defaultExportOption,
    },
  });

  // Update form when data is loaded
  useEffect(() => {
    if (privacySettings) {
      const retentionPeriod = privacySettings.dataRetentionPeriod || "90 days";
      const noticeType = privacySettings.privacyNoticeType || "short";
      const exportOption = privacySettings.includeDataExportOption ?? true;
      
      form.reset({
        dataRetentionPeriod: retentionPeriod,
        privacyNoticeType: noticeType,
        includeDataExportOption: exportOption,
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
        description: "Your privacy policy has been updated successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update privacy settings",
        description: error instanceof Error ? error.message : "An error occurred while updating your privacy settings.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PrivacyFormValues) => {
    updatePrivacyMutation.mutate(data);
  };

  const updatePrivacyPolicy = () => {
    setLoading(true);
    
    // Simulate policy update
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Privacy policy updated",
        description: "Your privacy policy has been regenerated with the latest settings.",
        variant: "default",
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center mb-4">
            <i className="ri-shield-keyhole-line text-xl text-primary mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-900">Data Privacy Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex bg-gray-50 p-4 rounded-lg">
                <Skeleton className="w-20 h-20 rounded" />
                <div className="ml-4">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
              </div>
              
              <div className="flex bg-gray-50 p-4 rounded-lg">
                <Skeleton className="w-20 h-20 rounded" />
                <div className="ml-4">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-5 w-60" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center mb-4">
          <i className="ri-shield-keyhole-line text-xl text-primary mr-2"></i>
          <h2 className="text-lg font-semibold text-gray-900">Data Privacy Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex bg-gray-50 p-4 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Data privacy illustration" 
                className="w-20 h-20 object-cover rounded" 
              />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Client Data Protection</h3>
                <p className="text-sm text-gray-600 mt-1">Your client data is encrypted and securely stored. Control what information is saved and for how long.</p>
              </div>
            </div>
            
            <div className="flex bg-gray-50 p-4 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Compliance illustration" 
                className="w-20 h-20 object-cover rounded" 
              />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Compliance Ready</h3>
                <p className="text-sm text-gray-600 mt-1">Our templates and data handling comply with GDPR, CCPA, and other privacy regulations.</p>
              </div>
            </div>
          </div>
          
          <div>
            <Form {...form}>
              <h3 className="font-medium text-gray-900 mb-3">Data Retention Settings</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="dataRetentionPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Data Retention Period</FormLabel>
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
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacyNoticeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Privacy Notice in Responses</FormLabel>
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
                          <SelectItem value="full">Full notice</SelectItem>
                          <SelectItem value="short">Short notice</SelectItem>
                          <SelectItem value="link">Link to privacy policy</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="includeDataExportOption"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="data-export-option"
                        />
                      </FormControl>
                      <FormLabel htmlFor="data-export-option" className="text-sm font-normal">
                        Include data export option in all responses
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-3 mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 flex items-center justify-center"
                    onClick={updatePrivacyPolicy}
                    disabled={loading}
                  >
                    <i className="ri-file-text-line mr-1.5"></i>
                    <span>Update Privacy Policy</span>
                  </Button>
                  
                  <Button 
                    type="button" 
                    className="flex-1"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={updatePrivacyMutation.isPending}
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
