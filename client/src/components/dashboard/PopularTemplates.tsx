import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Template } from "@shared/schema";

export default function PopularTemplates() {
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates/popular", { userId: 1, limit: 3 }],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Popular Templates</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            Manage Templates
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Popular Templates</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {templates?.map((template) => (
            <Link key={template.id} href={`/templates/${template.id}`}>
              <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">{template.name}</p>
                  <span className="text-xs bg-primary-100 text-primary py-1 px-2 rounded-full">
                    {template.usageCount} uses
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 truncate">
                  {template.content.substring(0, 40)}...
                </p>
              </div>
            </Link>
          ))}
          
          {templates?.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No templates found
            </div>
          )}
        </div>
        
        <Link href="/templates">
          <Button variant="outline" className="w-full mt-4 flex items-center justify-center">
            <span>Manage Templates</span>
            <i className="ri-arrow-right-line ml-1"></i>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
