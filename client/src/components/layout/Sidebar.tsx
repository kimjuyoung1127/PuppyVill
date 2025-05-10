import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";

export default function Sidebar() {
  const [location] = useLocation();
  
  // Fetch current user
  const { data: user } = useQuery<User>({
    queryKey: ["/api/users/1"],
    staleTime: Infinity,
  });

  const navItems = [
    { name: "Dashboard", path: "/", icon: "ri-dashboard-line" },
    { name: "Responses", path: "/responses", icon: "ri-chat-4-line" },
    { name: "Inquiries", path: "/inquiries", icon: "ri-customer-service-2-line" },
    { name: "Analytics", path: "/analytics", icon: "ri-bar-chart-box-line" },
  ];

  const settingsItems = [
    { name: "Templates", path: "/templates", icon: "ri-folder-template-line" },
    { name: "Privacy Controls", path: "/privacy-settings", icon: "ri-shield-keyhole-line" },
    { name: "Account", path: "/account", icon: "ri-user-settings-line" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <i className="ri-chat-voice-line text-2xl text-primary"></i>
          <h1 className="text-xl font-bold text-gray-900">ResponderPro</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">Automated customer inquiry system</p>
      </div>
      
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto scrollbar-hide">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main
        </div>
        
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              className={`flex items-center px-4 py-2.5 text-sm font-medium ${
                location === item.path
                  ? "text-primary bg-primary-50 border-r-4 border-primary"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <i className={`${item.icon} mr-3 text-lg`}></i>
              {item.name}
            </a>
          </Link>
        ))}
        
        <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Settings
        </div>
        
        {settingsItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              className={`flex items-center px-4 py-2.5 text-sm font-medium ${
                location === item.path
                  ? "text-primary bg-primary-50 border-r-4 border-primary"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <i className={`${item.icon} mr-3 text-lg`}></i>
              {item.name}
            </a>
          </Link>
        ))}
      </nav>
      
      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img 
              src={user.avatar || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"} 
              alt="User profile photo" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.name || user.username}</p>
              <p className="text-xs text-gray-500">{user.profession || "Freelancer"}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
