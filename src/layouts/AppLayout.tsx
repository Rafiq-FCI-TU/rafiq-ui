import { Outlet } from "react-router";
import { useState } from "react";
import {
  Menu,
  X,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  User,
  Stethoscope,
  Joystick,
  LayoutDashboard,
  Video,
  BotMessageSquare,
  MessageCircle,
} from "lucide-react";
import { NavLink } from "react-router";
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [role] = useState<"patient" | "specialist">("specialist");
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: role === "specialist"?Stethoscope:Users, label: role === "specialist"?"Specialist":"Patients", href: role === "specialist"?"/specialist":"/patients" },
    { icon: Video, label: "Sessions", href: "/sessions" },
    { icon: BotMessageSquare, label: "AI Assistant", href: "/ai-assistant" },
    { icon: MessageCircle, label: "Community", href: "/community" },
    { icon: Joystick, label: "Games", href: "/games" },
    { icon: Settings, label: "Settings", href: "/settings" },

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
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 bg-linear-to-r from-green-600 to-green-700 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                <img src="logo.png" alt="Rafiq Logo" className="size-6" />
              </div>
          
                <h1 className="text-xl font-bold text-white tracking-tight leading-none">
                  Rafiq
                </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-8">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] px-4 mb-3">
                Main Menu
              </p>
              <ul className="space-y-1">
                {menuItems.slice(0, 5).map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => `flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-green-50 text-green-700' : ''}`}
                    >
                      <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:rotate-3 transition-transform relative z-10" />
                      <span className="font-semibold text-sm relative z-10">
                        {item.label}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] px-4 mb-3">
                Management
              </p>
              <ul className="space-y-1">
                {menuItems.slice(6, 8).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-300 group relative overflow-hidden"
                    >
                      <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:rotate-3 transition-transform relative z-10" />
                      <span className="font-semibold text-sm relative z-10">
                        {item.label}
                      </span>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-center rounded-r-full"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>


          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3 shrink-0">
            <button className="flex items-center w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 group border border-transparent hover:border-red-100 shadow-sm hover:shadow-md active:scale-[0.98]">
              <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Navbar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 shadow-sm">
          <div className="px-6 py-[13.8px]">
            <div className="flex items-center lg:justify-end justify-between gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2.5 bg-gray-50 rounded-2xl hover:bg-gray-100 shadow-md cursor-pointer text-gray-600 transition-all active:scale-95"
                >
                  <Menu className="w-6 h-6" />
                </button>


              <div className="flex items-center gap-3 ">
                <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all group">
                  <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
                </button>

                <div className="relative ml-1">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                  >
                    <div className="w-9 h-9 bg-linear-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                      <span className="text-sm">DS</span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-[13px] font-bold text-gray-800 leading-none">
                        Dr. Smith
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                        Admin
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${profileDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 mb-1.5 border-b border-gray-50">
                        <p className="text-sm font-bold text-gray-800">
                          Dr. Smith
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          dr.smith@rafiq-medical.com
                        </p>
                      </div>
                      <div className="px-2 space-y-0.5">
                        <a
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-semibold">
                            My Profile
                          </span>
                        </a>
                        <a
                          href="/settings"
                          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                            <Settings className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-semibold">
                            Settings
                          </span>
                        </a>
                      </div>
                      <div className="mx-4 my-2.5 border-t border-gray-50"></div>
                      <div className="px-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors">
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
