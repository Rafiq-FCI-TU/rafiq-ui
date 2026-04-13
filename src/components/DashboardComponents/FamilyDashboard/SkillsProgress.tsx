import { Star, TrendingUp } from "lucide-react";

export default function SkillsProgress() {
  const skills = [
    {
      title: "Motor Skills",
      desc: "Physical coordination and movement activities",
      color: "#10b981",
      percent: 75,
      level: "Level 4",
      sessions: "8 completed"
    },
    {
      title: "Cognitive Skills",
      desc: "Problem-solving and thinking exercises",
      color: "#f59e0b",
      percent: 68,
      level: "Level 4",
      sessions: "8 completed"
    },
    {
      title: "Social Skills",
      desc: "Communication and interaction activities",
      color: "#ef4444",
      percent: 82,
      level: "Level 5",
      sessions: "8 completed"
    }
  ];

  const renderCircle = (percent: number, color: string, size: number = 120) => {
    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative flex justify-center items-center my-6 group">
        <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300" style={{ backgroundColor: color }}></div>
        <svg width={size} height={size} className="transform -rotate-90 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
          <circle
            cx="60" cy="60" r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth="10"
          />
          <circle
            cx="60" cy="60" r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-[28px] font-black tracking-tight" style={{ color }}>{percent}%</span>
          <TrendingUp className="w-4 h-4 text-green-500 mt-1" />
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {skills.map((skill, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{skill.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{skill.desc}</p>
            </div>
            <Star className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {renderCircle(skill.percent, skill.color)}

          <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs font-medium">Current Level</span>
              <span className="font-bold text-gray-900 text-sm px-2 py-1 bg-gray-100 rounded-md">{skill.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs font-medium">Sessions</span>
              <span className="font-bold text-green-600 text-sm">{skill.sessions}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{ width: `${skill.percent}%`, backgroundColor: skill.color }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
