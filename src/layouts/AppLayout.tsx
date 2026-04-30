import { Outlet } from "react-router";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Users,
  User,
  LogOut,
  Settings,
  Bell,
  Stethoscope,
  Joystick,
  LayoutDashboard,
  Video,
  BotMessageSquare,
  MessageCircle,
  Library,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MessagesSquare
} from "lucide-react";
import { NavLink, useLocation, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isFamily: boolean = user?.roles?.includes("Family") ?? false;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: isFamily ? Stethoscope : Users,
      label: isFamily ? "Specialists" : "Patients",
      href: isFamily ? "/specialists" : "/patients",
    },
    { icon: Video, label: "Sessions", href: "/sessions" },
    { icon: BotMessageSquare, label: "AI Assistant", href: "/ai-assistant" },
    { icon: MessageCircle, label: "Community", href: "/community" },
    { icon: MessagesSquare, label: "Chats", href: "/chats" },
    { icon: Joystick, label: "Games", href: "/games" },
    { icon: Library, label: "Resources", href: "/resources" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const notifications = [
    {
      id: 1,
      title: "New session scheduled",
      desc: "Tomorrow at 2:00 PM with Dr. Smith",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Community reply",
      desc: "Someone responded to your post",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Resource added",
      desc: "New article in Library",
      time: "3h ago",
      unread: false,
    },
  ];
  const currentPageTitle =
    menuItems.find((item) => pathname.startsWith(item.href))?.label ||
    "Activities";

  const sidebarWidth = sidebarCollapsed ? "w-20" : "w-72";
  const mainMargin = sidebarCollapsed ? "lg:ml-20" : "lg:ml-72";

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="cursor-pointer fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 ${sidebarWidth} bg-white border-r border-slate-100 shadow-[4px_0_24px_-8px_rgba(0,0,0,0.04)] transform transition-all duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div
            className={`flex py-5 items-center justify-between shrink-0 border-b border-slate-100 ${sidebarCollapsed ? "px-4 justify-center flex-wrap gap-3" : "px-5 "}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex p-2.5  items-center justify-center rounded-2xl bg-linear-to-br from-primary-light to-primary-dark shadow-md shadow-green-500/20 shrink-0">
                <img
                  src="logo.png"
                  alt="Rafiq Logo"
                  className="size-5 invert brightness-0"
                />
              </div>
              {!sidebarCollapsed && (
                <h1 className="text-2xl font-bold uppercase text-primary-dark">
                  Rafiq
                </h1>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden cursor-pointer p-2 rounded-xl text-primary-dark hover:bg-primary-dark hover:text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-3 px-2">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.href}>
                    {({ isActive }) => (
                      <div
                        className={`group relative flex items-center gap-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-linear-to-r from-primary-dark to-primary-light text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        } ${sidebarCollapsed ? "justify-center px-3 py-2.5" : "px-3 py-2.5"}`}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-linear-to-l from-primary-light to-primary-dark rounded-r-full" />
                        )}
                        <div
                          className={`flex items-center justify-center rounded-lg transition-all duration-200 shrink-0 ${
                            isActive
                              ? "bg-linear-to-br from-primary-light to-primary-dark text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-600"
                          } ${sidebarCollapsed ? "h-10 w-10" : "h-9 w-9"}`}
                        >
                          <item.icon
                            className={
                              sidebarCollapsed ? "size-5" : "size-[18px]"
                            }
                            strokeWidth={2}
                          />
                        </div>
                        {!sidebarCollapsed && (
                          <span className="font-medium text-[15px]">
                            {item.label}
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collapse Toggle */}
          <div
            className={`border-t border-slate-100 p-2 ${sidebarCollapsed ? "flex justify-center" : "px-2"}`}
          >
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`group relative flex items-center gap-3 rounded-lg transition-all duration-200 w-full cursor-pointer
                text-slate-600 hover:bg-slate-100 hover:text-slate-900
                ${sidebarCollapsed ? "justify-center px-3 py-2.5" : "px-3 py-2.5"}
              `}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <div
                className={`flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-600 transition-all duration-200 shrink-0 ${
                  sidebarCollapsed ? "h-10 w-10" : "h-9 w-9"
                }`}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-[18px] h-[18px]" />
                )}
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium text-[15px]">Collapse</span>
              )}
            </button>
          </div>

          {/* User Profile + Logout */}
          <div className="mt-auto border-t border-slate-100 p-3 shrink-0">
            {sidebarCollapsed ? (
              // Collapsed: Stack avatar and logout vertically
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark text-white">
                  <User className="h-5 w-5" />
                </div>
                <button
                  onClick={logout}
                  aria-label="Sign out"
                  title="Sign out"
                  className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl text-primary-dark hover:text-red-200 hover:bg-red-500 transition-all duration-300"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              // Expanded: Unified card with user info and logout
              <div className="flex items-center gap-2 rounded-xl bg-linear-to-r from-primary-dark to-primary-light p-2.5 text-white border border-slate-100">
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary-light to-primary-dark  shrink-0">
                  <User className="h-4 w-4" />
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium ">
                    {user?.username || user?.email || "User"}
                  </p>
                  {user?.roles && user.roles.length > 0 && (
                    <p className="truncate text-xs">{user.roles[0]}</p>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  aria-label="Sign out"
                  title="Sign out"
                  className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg hover:text-red-200 hover:bg-red-500 transition-all duration-200 shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={mainMargin}>
        {/* Modern Navbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Breadcrumb + Menu */}
              <div className="flex items-center gap-4 min-w-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden cursor-pointer p-2 rounded-lg bg-primary-light hover:bg-primary-dark text-white transition-all duration-300"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Breadcrumb */}
                <nav className="hidden sm:flex items-center gap-2 text-sm text-primary-light">
                  <Link
                    to="/dashboard"
                    className="hover:text-primary-dark transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight className="size-5 text-primary-dark" />
                  <span className="text-primary-dark font-medium">
                    {currentPageTitle}
                  </span>
                </nav>

                <h2 className="sm:hidden text-lg font-semibold tracking-tight text-primary-dark">
                  {currentPageTitle}
                </h2>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1.5">
                {/* AI Assistant Quick Access */}
                <Link
                  to="/ai-assistant"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-primary-light to-primary-dark text-white text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </Link>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                  </button>

                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl shadow-slate-950/10 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-800 text-sm">
                          Notifications
                        </h3>
                        <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                          2 new
                        </span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 ${notif.unread ? "bg-slate-50/50" : ""}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notif.unread ? "bg-green-500" : "bg-slate-300"}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800">
                                {notif.title}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                {notif.desc}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                        <button className="text-sm text-green-700 font-medium hover:text-green-700 transition-colors">
                          View all notifications
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
