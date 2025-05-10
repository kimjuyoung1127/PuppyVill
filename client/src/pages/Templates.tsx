import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import TemplateEditor from "@/components/templates/TemplateEditor";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Template } from "@shared/schema";

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch templates
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates", { userId: 1 }],
  });

  // Delete template mutation
  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/templates/${id}`, undefined);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/templates/popular"] });
      setDeleteDialogOpen(false);
      toast({
        title: "Template deleted",
        description: "Your template has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting template",
        description: error.message || "An error occurred while deleting your template.",
        variant: "destructive",
      });
    },
  });

  // Filter templates based on search term and category
  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (template.tags && template.tags.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterCategory === "all") return matchesSearch;
    return template.category === filterCategory && matchesSearch;
  });

  // Get unique categories from templates
  const categories = templates 
    ? Array.from(new Set(templates.map(template => template.category)))
    : [];

  // Create a new template
  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setShowTemplateEditor(true);
  };

  // Edit an existing template
  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setShowTemplateEditor(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (template: Template) => {
    setTemplateToDelete(template);
    setDeleteDialogOpen(true);
  };

  // Confirm template deletion
  const confirmDelete = () => {
    if (templateToDelete) {
      deleteTemplateMutation.mutate(templateToDelete.id);
    }
  };

  // Handle template creation/edit success
  const handleTemplateSuccess = () => {
    setShowTemplateEditor(false);
    setEditingTemplate(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage response templates</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Input
            type="search"
            placeholder="Search templates..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="flex items-center" onClick={handleCreateTemplate}>
            <i className="ri-add-line mr-1.5"></i>
            <span>New Template</span>
          </Button>
        </div>
      </div>
      
      {showTemplateEditor ? (
        <div className="mb-6">
          <TemplateEditor 
            userId={1} 
            defaultValues={editingTemplate ? {
              name: editingTemplate.name,
              category: editingTemplate.category,
              tags: editingTemplate.tags || "",
              content: editingTemplate.content
            } : undefined}
            onSuccess={handleTemplateSuccess}
          />
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setShowTemplateEditor(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Response Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-6" onValueChange={setFilterCategory}>
              <TabsList>
                <TabsTrigger value="all">All Categories</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-6 w-8" />
                    </div>
                    <Skeleton className="h-4 w-32 mt-2" />
                    <Skeleton className="h-4 w-full mt-4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                    <div className="flex justify-between mt-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-20 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTemplates && filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <i className="ri-more-2-fill"></i>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                            <i className="ri-edit-line mr-2"></i> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive" 
                            onClick={() => handleDeleteClick(template)}
                          >
                            <i className="ri-delete-bin-line mr-2"></i> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                        {template.category}
                      </span>
                      {template.usageCount > 0 && (
                        <span className="text-xs text-gray-500 ml-2">
                          Used {template.usageCount} times
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                      {template.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex justify-between items-center mt-4 pt-2 border-t">
                      <div className="text-xs text-gray-500 flex items-center">
                        <i className="ri-time-line mr-1"></i>
                        <span>
                          {new Date(template.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditTemplate(template)}
                      >
                        Edit Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <i className="ri-file-text-line text-xl text-gray-400"></i>
                </div>
                <h3 className="text-gray-600 font-medium">No templates found</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {searchTerm 
                    ? "Try adjusting your search criteria" 
                    : filterCategory !== "all" 
                      ? `You have no templates in the ${filterCategory} category` 
                      : "Create your first template to get started"}
                </p>
                {!searchTerm && (
                  <Button 
                    className="mt-4" 
                    onClick={handleCreateTemplate}
                  >
                    Create Template
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{templateToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteTemplateMutation.isPending}
            >
              {deleteTemplateMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
