import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Inquiry, InsertInquiry } from "@shared/schema";

export function useInquiries(userId: number) {
  const queryClient = useQueryClient();
  
  // Fetch all inquiries
  const { 
    data: inquiries, 
    isLoading: isLoadingInquiries, 
    error: inquiriesError 
  } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries", { userId }],
  });

  // Fetch recent inquiries
  const { 
    data: recentInquiries, 
    isLoading: isLoadingRecent, 
    error: recentError 
  } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries/recent", { userId, limit: 5 }],
  });

  // Create inquiry
  const createInquiry = useMutation({
    mutationFn: async (data: Omit<InsertInquiry, "userId">) => {
      const response = await apiRequest("POST", "/api/inquiries", {
        ...data,
        userId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries/recent"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
    },
  });

  // Respond to inquiry
  const respondToInquiry = useMutation({
    mutationFn: async ({ 
      id, 
      responseContent, 
      templateId 
    }: { 
      id: number; 
      responseContent: string; 
      templateId?: number 
    }) => {
      const response = await apiRequest("POST", `/api/inquiries/${id}/respond`, {
        responseContent,
        templateId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries/recent"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
    },
  });

  // Delete inquiry
  const deleteInquiry = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/inquiries/${id}`, undefined);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries/recent"] });
    },
  });

  // Get inquiry by ID
  const getInquiryById = (id: number) => {
    return inquiries?.find(inquiry => inquiry.id === id);
  };

  // Get inquiries by status
  const getInquiriesByStatus = (status: string) => {
    return inquiries?.filter(inquiry => inquiry.status === status);
  };

  // Get inquiry type distribution
  const getInquiryTypeDistribution = () => {
    if (!inquiries) return [];
    
    const distribution = inquiries.reduce((acc, inquiry) => {
      acc[inquiry.inquiryType] = (acc[inquiry.inquiryType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(distribution).map(([type, count]) => ({ name: type, value: count }));
  };

  return {
    inquiries,
    recentInquiries,
    isLoading: isLoadingInquiries || isLoadingRecent,
    error: inquiriesError || recentError,
    createInquiry: createInquiry.mutate,
    respondToInquiry: respondToInquiry.mutate,
    deleteInquiry: deleteInquiry.mutate,
    isPendingCreate: createInquiry.isPending,
    isPendingRespond: respondToInquiry.isPending,
    isPendingDelete: deleteInquiry.isPending,
    getInquiryById,
    getInquiriesByStatus,
    inquiryTypeDistribution: getInquiryTypeDistribution(),
  };
}
