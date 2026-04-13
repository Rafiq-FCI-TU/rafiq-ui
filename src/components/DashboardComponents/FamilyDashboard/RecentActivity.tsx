import { Clock, ChevronRight } from "lucide-react";

export default function RecentActivity() {
  const recentActivity = [
    { icon: "✓", text: "Completed Motor Skills Session", time: "2 hours ago", color: "#10b981" },
    { icon: "📊", text: "Weekly Progress Report Available", time: "5 hours ago", color: "#3b82f6" },
    { icon: "🎯", text: "New Goal Achieved: Social Skills L5", time: "1 day ago", color: "#f59e0b" },
    { icon: "📅", text: "Upcoming Session with Dr. Mitchell", time: "Tomorrow, 10:00 AM", color: "#8b5cf6" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
      </div>
      <div className="space-y-4">
        {recentActivity.map((activity, i) => (
          <div key={i} className="flex items-start gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: `${activity.color}15` }}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors truncate">{activity.text}</p>
              <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  );
}
