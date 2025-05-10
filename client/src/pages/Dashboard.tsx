import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentInquiries from "@/components/dashboard/RecentInquiries";
import PopularTemplates from "@/components/dashboard/PopularTemplates";
import PrivacyControls from "@/components/dashboard/PrivacyControls";
import TemplateEditor from "@/components/templates/TemplateEditor";
import DataPrivacy from "@/components/privacy/DataPrivacy";
import { User } from "@shared/schema";

export default function Dashboard() {
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  
  // Fetch user data
  const { data: user } = useQuery<User>({
    queryKey: ["/api/users/1"],
    staleTime: Infinity,
  });

  // Handle template creation
  const handleCreateTemplate = () => {
    setShowTemplateEditor(true);
  };

  // Handle template creation success
  const handleTemplateSuccess = () => {
    setShowTemplateEditor(false);
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
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto pb-20 md:pb-8">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 -mx-4 -mt-4 mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="ri-chat-voice-line text-2xl text-primary"></i>
            <h1 className="text-xl font-bold text-gray-900">ResponderPro</h1>
          </div>
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <i className="ri-menu-line text-2xl"></i>
          </button>
        </div>
      </header>
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage your automated customer responses</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="flex items-center" onClick={handleExportData}>
            <i className="ri-download-2-line mr-1.5"></i>
            <span>Export Data</span>
          </Button>
          <Button className="flex items-center" onClick={handleCreateTemplate}>
            <i className="ri-add-line mr-1.5"></i>
            <span>New Template</span>
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <StatsGrid />
      
      {/* Inquiries and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RecentInquiries />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <PopularTemplates />
          <PrivacyControls />
        </div>
      </div>
      
      {/* Template Editor (conditionally rendered) */}
      {showTemplateEditor && (
        <div className="mb-6">
          <TemplateEditor userId={1} onSuccess={handleTemplateSuccess} />
        </div>
      )}
      
      {/* Data Privacy Information */}
      <DataPrivacy />
    </div>
  );
}
