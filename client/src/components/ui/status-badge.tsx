import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  variant: "status" | "type";
  status?: string;
  type?: string;
}

export function StatusBadge({ variant, status, type, className, ...props }: StatusBadgeProps) {
  let badgeContent = "";
  let badgeStyle = "";

  if (variant === "status" && status) {
    badgeContent = status.charAt(0).toUpperCase() + status.slice(1);
    
    // Status-specific styles
    switch (status.toLowerCase()) {
      case "responded":
        badgeStyle = "bg-green-100 text-green-800";
        break;
      case "pending":
        badgeStyle = "bg-amber-100 text-amber-800";
        break;
      case "draft":
        badgeStyle = "bg-gray-100 text-gray-800";
        break;
      default:
        badgeStyle = "bg-gray-100 text-gray-800";
    }
  } else if (variant === "type" && type) {
    badgeContent = type;
    
    // Type-specific styles
    switch (type.toLowerCase()) {
      case "pricing":
        badgeStyle = "bg-blue-100 text-blue-800";
        break;
      case "project timeline":
        badgeStyle = "bg-purple-100 text-purple-800";
        break;
      case "urgent support":
        badgeStyle = "bg-red-100 text-red-800";
        break;
      case "booking":
        badgeStyle = "bg-green-100 text-green-800";
        break;
      default:
        badgeStyle = "bg-gray-100 text-gray-800";
    }
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium py-1 border-0",
        badgeStyle,
        className
      )}
      {...props}
    >
      {badgeContent}
    </Badge>
  );
}
