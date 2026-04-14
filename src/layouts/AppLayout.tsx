import { Link, Outlet } from "react-router";
import { useState } from "react";
import {
  Menu,
  X,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Stethoscope,
  Joystick,
  LayoutDashboard,
  Video,
  BotMessageSquare,
  MessageCircle,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
export default function AppLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full bg-white shadow-xl">
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 bg-linear-to-r from-primary-dark to-primary shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                <img src="logo.png" alt="Rafiq Logo" className="size-6" />
              </div>

              <h1 className="text-2xl font-bold text-white tracking-tight leading-none">
                Rafiq
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-8">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-green-100 hover:text-primary transition-all duration-300 group relative overflow-hidden ${isActive ? "bg-green-100 text-primary font-bold" : ""}`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10" />
                    <span className="font-semibold text-sm relative z-10">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3 shrink-0">
            <button
              onClick={logout}
              className="flex cursor-pointer items-center w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 group border border-transparent hover:border-red-100 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-bold text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Navbar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 shadow-sm">
          <div className="px-6 py-[13.74px]">
            <div className="flex items-center lg:justify-end justify-between gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 bg-linear-to-r from-primary-dark to-green-700 rounded-2xl hover:opacity-90 shadow-md cursor-pointer text-white transition-all duration-300 active:scale-95"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 ">
                <button className="relative p-2.5 cursor-pointer text-gray-500 hover:bg-gray-50 rounded-xl transition-all duration-300 group">
                  <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
                </button>

                <div className="relative ml-1">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center hover:cursor-pointer gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
                  >
                    <div className="w-9 h-9 bg-linear-to-r from-primary-dark to-primary rounded-xl flex items-center justify-center text-white font-bold shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="text-sm">
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-[13px] font-bold text-gray-800 leading-none">
                        {user?.username || "Username"}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                        {user?.roles?.[0] || "User"}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${profileDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-md border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 mb-1.5 border-b border-gray-50">
                        <p className="text-sm font-bold text-gray-800">
                          {user?.username || "Username"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                      <div className="px-2 space-y-0.5">
                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-color duration-300 group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center text-gray-600">
                            <Settings className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-semibold">
                            Settings
                          </span>
                        </Link>
                      </div>
                      <div className="px-2">
                        <button
                          onClick={logout}
                          className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-300 group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors duration-300">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
