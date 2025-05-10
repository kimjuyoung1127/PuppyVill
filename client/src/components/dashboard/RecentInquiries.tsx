import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badge";
import { Inquiry } from "@shared/schema";

export default function RecentInquiries() {
  const [limit] = useState(5);
  
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries/recent", { userId: 1, limit }],
  });

  // Convert timestamp to readable format
  const formatTime = (date: Date | null | undefined) => {
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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
            <Button variant="link" size="sm" className="text-primary">
              View All <i className="ri-arrow-right-line ml-1"></i>
            </Button>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(4)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="ml-3">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32 mt-1" />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-10" />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-8" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
          <Link href="/inquiries">
            <Button variant="link" size="sm" className="text-primary">
              View All <i className="ri-arrow-right-line ml-1"></i>
            </Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries?.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarFallback>{getInitials(inquiry.clientName)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{inquiry.clientName}</p>
                        <p className="text-xs text-gray-500">{inquiry.clientEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <StatusBadge variant="type" type={inquiry.inquiryType} />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{formatTime(inquiry.createdAt)}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <StatusBadge variant="status" status={inquiry.status} />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm">
                    <Link href={`/inquiries/${inquiry.id}`}>
                      <Button variant="link" size="sm" className="text-primary font-medium p-0">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              
              {inquiries?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
