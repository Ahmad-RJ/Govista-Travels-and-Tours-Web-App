import { Link, useLocation } from "wouter";
import { MapPin, MessageSquare, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const [location] = useLocation();

  const navItems = [
    {
      href: "/admin/destinations",
      label: "Destinations",
      icon: MapPin,
    },
    {
      href: "/admin/reviews",
      label: "Reviews & Feedback",
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white fixed left-0 top-0">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">GoVista</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
