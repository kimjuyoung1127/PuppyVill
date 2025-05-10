import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Inquiry, Template } from "@shared/schema";

export default function Inquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [responseContent, setResponseContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch inquiries
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries", { userId: 1 }],
  });

  // Fetch templates for response
  const { data: templates } = useQuery<Template[]>({
    queryKey: ["/api/templates", { userId: 1 }],
  });

  // Filter inquiries based on status and search term
  const filteredInquiries = inquiries?.filter(inquiry => {
    const matchesSearch = 
      inquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inquiry.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.inquiryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return inquiry.status === filter && matchesSearch;
  });

  // Respond to inquiry mutation
  const respondToInquiryMutation = useMutation({
    mutationFn: async (data: { id: number; responseContent: string; templateId?: number }) => {
      const response = await apiRequest(
        "POST",
        `/api/inquiries/${data.id}/respond`,
        {
          responseContent: data.responseContent,
          templateId: data.templateId
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
      setIsResponseDialogOpen(false);
      setResponseContent("");
      setSelectedTemplate("");
      toast({
        title: "Response sent",
        description: "Your response has been sent successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending response",
        description: error.message || "An error occurred while sending your response.",
        variant: "destructive",
      });
    },
  });

  // Format date for readability
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate time ago
  const timeAgo = (date: Date | null | undefined) => {
    if (!date) return "";
    
    const now = new Date();
    const inquiryDate = new Date(date);
    const diffMs = now.getTime() - inquiryDate.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  // Get initials from client name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Open response dialog
  const openResponseDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setResponseContent("");
    setSelectedTemplate("");
    setIsResponseDialogOpen(true);
  };

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    if (templateId && parseInt(templateId) > 0) {
      const template = templates?.find(t => t.id === parseInt(templateId));
      if (template) {
        // Replace dynamic fields with placeholder values
        let content = template.content;
        if (selectedInquiry) {
          content = content.replace(/{{client_name}}/g, selectedInquiry.clientName);
          content = content.replace(/{{project_name}}/g, "your project");
          content = content.replace(/{{price_range}}/g, "$X-$Y");
          content = content.replace(/{{timeline}}/g, "X-Y weeks");
          content = content.replace(/{{contact_details}}/g, "contact@example.com");
        }
        setResponseContent(content);
      }
    }
  };

  // Send response
  const sendResponse = () => {
    if (!selectedInquiry || !responseContent) return;
    
    respondToInquiryMutation.mutate({
      id: selectedInquiry.id,
      responseContent,
      templateId: selectedTemplate ? parseInt(selectedTemplate) : undefined
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-sm text-gray-500 mt-1">View and respond to customer inquiries</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Input
            type="search"
            placeholder="Search inquiries..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Customer Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-4" onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="ml-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24 mt-1" />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mt-4" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredInquiries && filteredInquiries.length > 0 ? (
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(inquiry.clientName)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{inquiry.clientName}</p>
                        <p className="text-xs text-gray-500">{inquiry.clientEmail}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <StatusBadge variant="type" type={inquiry.inquiryType} />
                      <StatusBadge variant="status" status={inquiry.status} />
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{inquiry.content}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      Received: {timeAgo(inquiry.createdAt)}
                    </span>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <Link href={`/inquiries/${inquiry.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      {inquiry.status !== "responded" && (
                        <Button 
                          size="sm"
                          onClick={() => openResponseDialog(inquiry)}
                        >
                          Respond
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <i className="ri-inbox-line text-xl text-gray-400"></i>
              </div>
              <h3 className="text-gray-600 font-medium">No inquiries found</h3>
              <p className="text-gray-500 text-sm mt-1">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : filter !== "all" 
                    ? `You have no ${filter} inquiries` 
                    : "You have no inquiries yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Dialog */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Respond to Inquiry</DialogTitle>
            <DialogDescription>
              {selectedInquiry && (
                <div className="mt-2 bg-gray-50 p-3 rounded border-l-2 border-primary">
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-sm text-gray-700">From:</span>
                    <span className="ml-2 text-sm">{selectedInquiry.clientName} ({selectedInquiry.clientEmail})</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-sm text-gray-700">Subject:</span>
                    <span className="ml-2 text-sm">{selectedInquiry.inquiryType} Inquiry</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-700 mb-1">Message:</p>
                    <p className="text-sm text-gray-600">{selectedInquiry.content}</p>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Use Template
              </label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No template</SelectItem>
                  {templates?.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Response
              </label>
              <Textarea
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                placeholder="Type your response here..."
                className="min-h-[200px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResponseDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={sendResponse}
              disabled={respondToInquiryMutation.isPending || !responseContent}
            >
              {respondToInquiryMutation.isPending ? "Sending..." : "Send Response"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
