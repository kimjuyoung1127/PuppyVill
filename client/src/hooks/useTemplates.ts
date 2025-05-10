import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Template, InsertTemplate } from "@shared/schema";

export function useTemplates(userId: number) {
  const queryClient = useQueryClient();
  
  // Fetch all templates
  const { 
    data: templates, 
    isLoading: isLoadingTemplates, 
    error: templatesError 
  } = useQuery<Template[]>({
    queryKey: ["/api/templates", { userId }],
  });

  // Fetch popular templates
  const { 
    data: popularTemplates, 
    isLoading: isLoadingPopular, 
    error: popularError 
  } = useQuery<Template[]>({
    queryKey: ["/api/templates/popular", { userId, limit: 3 }],
  });

  // Create template
  const createTemplate = useMutation({
    mutationFn: async (data: Omit<InsertTemplate, "userId">) => {
      const response = await apiRequest("POST", "/api/templates", {
        ...data,
        userId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/templates/popular"] });
    },
  });

  // Update template
  const updateTemplate = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Template> }) => {
      const response = await apiRequest("PUT", `/api/templates/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/templates/popular"] });
    },
  });

  // Delete template
  const deleteTemplate = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/templates/${id}`, undefined);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/templates/popular"] });
    },
  });

  // Get template categories
  const getCategories = () => {
    if (!templates) return [];
    return Array.from(new Set(templates.map(template => template.category)));
  };

  // Get template by ID
  const getTemplateById = (id: number) => {
    return templates?.find(template => template.id === id);
  };

  return {
    templates,
    popularTemplates,
    isLoading: isLoadingTemplates || isLoadingPopular,
    error: templatesError || popularError,
    createTemplate: createTemplate.mutate,
    updateTemplate: updateTemplate.mutate,
    deleteTemplate: deleteTemplate.mutate,
    isPendingCreate: createTemplate.isPending,
    isPendingUpdate: updateTemplate.isPending,
    isPendingDelete: deleteTemplate.isPending,
    categories: getCategories(),
    getTemplateById,
  };
}
