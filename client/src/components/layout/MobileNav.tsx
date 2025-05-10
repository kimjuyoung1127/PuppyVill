import { Link, useLocation } from "wouter";

export default function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: "ri-dashboard-line" },
    { name: "Responses", path: "/responses", icon: "ri-chat-4-line" },
    { name: "Inquiries", path: "/inquiries", icon: "ri-customer-service-2-line" },
    { name: "Account", path: "/account", icon: "ri-user-3-line" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around z-10">
      {navItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <a className={`flex flex-col items-center py-2 px-3 ${
            location === item.path ? "text-primary" : "text-gray-600"
          }`}>
            <i className={`${item.icon} text-xl`}></i>
            <span className="text-xs mt-1">{item.name}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
}
