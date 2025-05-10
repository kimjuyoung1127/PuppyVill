import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Template schema with validation
const templateSchema = z.object({
  name: z.string().min(3, "Template name must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.string().optional(),
  content: z.string().min(10, "Template content must be at least 10 characters"),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

interface TemplateEditorProps {
  userId: number;
  defaultValues?: TemplateFormValues;
  onSuccess?: () => void;
}

export default function TemplateEditor({ 
  userId, 
  defaultValues = {
    name: "",
    category: "",
    tags: "",
    content: "Hi {{client_name}},\n\nThank you for your inquiry about {{project_name}}. I appreciate your interest in my services.\n\nBased on your requirements, the estimated price range for this type of project would be {{price_range}}. The timeline to complete the work would be approximately {{timeline}}.\n\nPlease let me know if you have any questions or would like to discuss this further. You can reach me at {{contact_details}}.\n\nBest regards,\n[Your Name]"
  },
  onSuccess
}: TemplateEditorProps) {
  const [previewData, setPreviewData] = useState({
    client_name: "Sarah",
    project_name: "Website Redesign",
    price_range: "$2,000-$3,500",
    timeline: "3-4 weeks",
    contact_details: "contact@example.com or (555) 123-4567"
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues
  });

  const createTemplateMutation = useMutation({
    mutationFn: async (data: TemplateFormValues) => {
      const response = await apiRequest("POST", "/api/templates", {
        ...data,
        userId
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/templates/popular"] });
      toast({
        title: "Template created",
        description: "Your template has been created successfully.",
        variant: "default",
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Failed to create template",
        description: error.message || "An error occurred while creating your template.",
        variant: "destructive",
      });
    },
  });

  const saveDraftMutation = useMutation({
    mutationFn: async (data: TemplateFormValues) => {
      const response = await apiRequest("POST", "/api/templates", {
        ...data,
        userId,
        isDraft: true
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      toast({
        title: "Draft saved",
        description: "Your template draft has been saved.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to save draft",
        description: error.message || "An error occurred while saving your draft.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TemplateFormValues) => {
    createTemplateMutation.mutate(data);
  };

  const saveDraft = () => {
    const data = form.getValues();
    saveDraftMutation.mutate(data);
  };

  const insertDynamicField = (field: string) => {
    const textarea = document.getElementById("template-content") as HTMLTextAreaElement;
    if (!textarea) return;
    
    const cursorPosition = textarea.selectionStart;
    const textBefore = form.getValues("content").substring(0, cursorPosition);
    const textAfter = form.getValues("content").substring(cursorPosition);
    
    form.setValue("content", textBefore + field + textAfter);
    
    // Restore focus and position cursor after inserted field
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = cursorPosition + field.length;
      textarea.selectionEnd = cursorPosition + field.length;
    }, 0);
  };

  const refreshPreview = () => {
    // This would be more sophisticated in a real app
    toast({
      title: "Preview refreshed",
      variant: "default",
    });
  };

  const categoryOptions = [
    "Pricing",
    "Project Timeline",
    "Booking",
    "Support",
    "General Inquiry"
  ];

  const dynamicFields = [
    "{{client_name}}",
    "{{project_name}}",
    "{{price_range}}",
    "{{timeline}}",
    "{{contact_details}}"
  ];

  const renderPreview = () => {
    let content = form.getValues("content");
    Object.entries(previewData).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    
    // Replace other placeholder
    content = content.replace(/\[Your Name\]/g, "Emma Rodriguez");
    
    // Convert line breaks to paragraph tags
    return content.split('\n').map((line, index) => 
      line.trim() ? <p key={index}>{line}</p> : <br key={index} />
    );
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Create Response Template</h2>
          <div className="mt-3 md:mt-0 flex space-x-3">
            <Button 
              variant="outline" 
              onClick={saveDraft} 
              disabled={saveDraftMutation.isPending || createTemplateMutation.isPending}
            >
              Save Draft
            </Button>
            <Button 
              onClick={form.handleSubmit(onSubmit)} 
              disabled={saveDraftMutation.isPending || createTemplateMutation.isPending}
            >
              Save Template
            </Button>
          </div>
        </div>
        
        <Form {...form}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Project Inquiry Response" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="pricing, freelance, web design" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-1">Dynamic Fields</p>
                  <div className="flex flex-wrap gap-2">
                    {dynamicFields.map((field) => (
                      <Button
                        key={field}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 h-auto"
                        onClick={() => insertDynamicField(field)}
                      >
                        {field}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Content</FormLabel>
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-bold text-gray-700"></i>
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-italic text-gray-700"></i>
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-underline text-gray-700"></i>
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-link text-gray-700"></i>
                        </Button>
                        <div className="h-5 w-px bg-gray-300 mx-1"></div>
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-list-unordered text-gray-700"></i>
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-list-ordered text-gray-700"></i>
                        </Button>
                        <div className="h-5 w-px bg-gray-300 mx-1"></div>
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-emotion-line text-gray-700"></i>
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
                          <i className="ri-image-line text-gray-700"></i>
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          id="template-content"
                          placeholder="Type your response template here..."
                          className="w-full p-3 min-h-[300px] border-0 focus-visible:ring-0 shadow-none"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="block text-sm font-medium text-gray-700">Preview</p>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-primary" 
                    onClick={refreshPreview}
                  >
                    Refresh
                  </Button>
                </div>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50 prose prose-sm max-w-none">
                  {renderPreview()}
                </div>
              </div>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
