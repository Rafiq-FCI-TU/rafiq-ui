import { Outlet } from "react-router";
import { useState } from "react";
import {
  Menu,
  X,
  Users,
  User,
  Settings,
  LogOut,
  Bell,
  Stethoscope,
  Joystick,
  LayoutDashboard,
  Video,
  BotMessageSquare,
  MessageCircle,
  Library,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
export default function AppLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const isFamily: boolean = user?.roles?.includes("Family") ?? false;
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: isFamily ? Stethoscope : Users,
      label: isFamily ? "Specialist" : "Patients",
      href: isFamily ? "/specialist" : "/patients",
    },
    { icon: Video, label: "Sessions", href: "/sessions" },
    { icon: BotMessageSquare, label: "AI Assistant", href: "/ai-assistant" },
    { icon: MessageCircle, label: "Community", href: "/community" },
    { icon: Joystick, label: "Games", href: "/games" },
    { icon: Library, label: "Library", href: "/library" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];
  const currentPageTitle =
    menuItems.find((item) => pathname.startsWith(item.href))?.label ||
    "Activities";

  return (
    <div className="min-h-screen bg-[#f3f5f4]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-75 bg-[#0f5a3a] text-white shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col bg-[#0f5a3a]">
          <div className="relative flex h-20 items-center justify-between px-5 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                <img src="logo.png" alt="Rafiq Logo" className="size-9" />
              </div>
              <h1 className="text-3xl font-semibold text-white leading-none">
                Rafiq
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.href}>
                    {({ isActive }) => (
                      <div
                        className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                          isActive
                            ? "bg-[#1f7a53] text-white"
                            : "text-white/85 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-transparent text-white/90"
                          }`}
                        >
                          <item.icon className="w-7 h-7" />
                        </div>
                        <span className="font-medium text-[20px] leading-none">
                          {item.label}
                        </span>
                      </div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto border-t border-white/10 px-3 py-2.5 shrink-0 bg-[#0d5436]">
            <div className="flex w-full items-center justify-between rounded-xl px-2 py-1 text-white/95">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f7a53]">
                  <User className="h-5 w-5 text-white/90" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="truncate text-sm font-medium leading-tight">
                    {user?.username || user?.email || "User"}
                  </p>
                  {user?.roles && user.roles.length > 0 && (
                    <p className="truncate text-xs text-white/60 leading-tight mt-0.5">
                      {user.roles.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={logout}
                aria-label="Sign out"
                className="ml-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-75">
        {/* Navbar */}
        <header className="sticky top-0 z-30 border-b border-[#dde3df] bg-white">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 bg-[#0f5a3a] rounded-xl hover:opacity-90 cursor-pointer text-white transition-all duration-300"
              >
                <Menu className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-medium text-[#1f2c28] tracking-tight">
                {currentPageTitle}
              </h2>
              <div className="ml-auto flex items-center gap-3">
                <button className="relative p-2.5 cursor-pointer text-[#44534d] hover:bg-[#f4f6f5] rounded-xl transition-colors duration-200">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
