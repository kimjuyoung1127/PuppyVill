import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Inquiries as InquiriesType } from "@shared/schema";

export default function Responses() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: inquiries, isLoading } = useQuery<InquiriesType[]>({
    queryKey: ["/api/inquiries", { userId: 1, responded: true }],
  });

  const filteredInquiries = inquiries?.filter(inquiry => 
    inquiry.status === "responded" && 
    (inquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     inquiry.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
     inquiry.inquiryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
     inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format date for readability
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate response time in a readable format
  const formatResponseTime = (seconds: number | null) => {
    if (!seconds) return "N/A";
    
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
  };

  // Get initials from client name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Responses</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage your customer inquiry responses</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Input
            type="search"
            placeholder="Search responses..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Response History</CardTitle>
        </CardHeader>
        <CardContent>
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
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full mt-4" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredInquiries && filteredInquiries.length > 0 ? (
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(inquiry.clientName)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{inquiry.clientName}</p>
                        <p className="text-xs text-gray-500">{inquiry.clientEmail}</p>
                      </div>
                    </div>
                    <StatusBadge variant="type" type={inquiry.inquiryType} />
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 font-medium">Inquiry:</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{inquiry.content}</p>
                  </div>
                  
                  {inquiry.responseContent && (
                    <div className="mt-3 bg-gray-50 p-3 rounded border-l-2 border-primary">
                      <p className="text-sm text-gray-700 font-medium">Response:</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{inquiry.responseContent}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-4 pt-2 border-t text-xs text-gray-500">
                    <div className="flex space-x-3">
                      <span>Responded: {formatDate(inquiry.respondedAt)}</span>
                      <span>Response time: {formatResponseTime(inquiry.responseTime)}</span>
                    </div>
                    <Link href={`/inquiries/${inquiry.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary h-auto py-0">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <i className="ri-inbox-line text-xl text-gray-400"></i>
              </div>
              <h3 className="text-gray-600 font-medium">No responses found</h3>
              <p className="text-gray-500 text-sm mt-1">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : "You haven't responded to any inquiries yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
