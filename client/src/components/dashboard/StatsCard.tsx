import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  changeValue?: string;
  changeText?: string;
  isLoading?: boolean;
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  iconBgColor, 
  iconColor,
  changeValue,
  changeText,
  isLoading = false
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : (
              <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            )}
          </div>
          <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center`}>
            <i className={`${icon} text-lg ${iconColor}`}></i>
          </div>
        </div>
        
        {(changeValue || changeText) && (
          <div className="mt-4 flex items-center text-sm">
            {changeValue && (
              <span className={`${changeValue.startsWith('-') ? 'text-destructive' : 'text-green-500'} flex items-center`}>
                <i className={`${changeValue.startsWith('-') ? 'ri-arrow-down-line' : 'ri-arrow-up-line'} mr-1`}></i>
                {changeValue}
              </span>
            )}
            {changeText && (
              <span className="text-gray-500 ml-2">{changeText}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
