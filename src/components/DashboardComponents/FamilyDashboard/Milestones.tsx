import { Award } from "lucide-react";

export default function Milestones() {
  const milestones = [
    { title: "Motor Skills Level 5", progress: 75, target: "80%", icon: "🏃", color: "#10b981" },
    { title: "Cognitive Skills Level 5", progress: 68, target: "75%", icon: "🧠", color: "#f59e0b" },
    { title: "Social Skills Level 6", progress: 82, target: "90%", icon: "👥", color: "#ef4444" }
  ];

  return (
    <div className="bg-linear-to-br from-primary-dark to-green-600 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5" />
        <h3 className="text-lg font-bold">Achievement Milestones</h3>
      </div>
      <div className="space-y-4">
        {milestones.map((milestone, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{milestone.icon}</span>
                <div>
                  <p className="text-sm font-bold">{milestone.title}</p>
                  <p className="text-xs text-green-100">Target: {milestone.target}</p>
                </div>
              </div>
              <span className="text-lg font-black">{milestone.progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-white transition-all duration-1000"
                style={{ width: `${milestone.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
