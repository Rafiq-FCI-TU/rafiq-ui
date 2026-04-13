import { TrendingUp } from "lucide-react";

export default function ProgressChart() {
  const chartData = [
    { week: "W1", motor: 60, cognitive: 45, social: 70 },
    { week: "W2", motor: 65, cognitive: 50, social: 72 },
    { week: "W3", motor: 68, cognitive: 52, social: 75 },
    { week: "W4", motor: 70, cognitive: 58, social: 77 },
    { week: "W5", motor: 72, cognitive: 62, social: 78 },
    { week: "W6", motor: 73, cognitive: 65, social: 80 },
    { week: "W7", motor: 75, cognitive: 68, social: 82 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 p-6 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Progress Over Time</h3>
          </div>
          <p className="text-sm text-gray-500">Weekly improvement across all skill areas</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer">
            Week
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer">
            Month
          </button>
        </div>
      </div>

      {/* Custom Bar Chart */}
      <div className="relative h-64 w-full">
        {/* Y Axis Labels and Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pb-13">
          {[100, 75, 50, 25, 0].map((val) => (
            <div key={val} className="flex relative items-center w-full">
              <span className="w-8 text-right pr-3 text-xs font-medium text-gray-400">{val}</span>
              <div className="flex-1 border-t border-gray-100 border-dashed"></div>
            </div>
          ))}
        </div>

        {/* X Axis & Bars */}
        <div className="absolute inset-0 flex items-end justify-between pl-8 pr-2 pb-13">
          {chartData.map((data, i) => (
            <div key={i} className="flex flex-col items-center h-full justify-end relative z-10 w-full group cursor-pointer">
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div
                  className="w-[22%] max-w-4.5 bg-linear-to-t from-emerald-600 to-green-400 rounded-t-md group-hover:opacity-80 transition-all duration-300 hover:scale-y-105 origin-bottom shadow-sm"
                  style={{ height: `${data.motor}%` }}
                ></div>
                <div
                  className="w-[22%] max-w-4.5 bg-linear-to-t from-amber-600 to-yellow-400 rounded-t-md group-hover:opacity-80 transition-all duration-300 hover:scale-y-105 origin-bottom shadow-sm"
                  style={{ height: `${data.cognitive}%` }}
                ></div>
                <div
                  className="w-[22%] max-w-4.5 bg-linear-to-t from-red-600 to-rose-400 rounded-t-md group-hover:opacity-80 transition-all duration-300 hover:scale-y-105 origin-bottom shadow-sm"
                  style={{ height: `${data.social}%` }}
                ></div>
              </div>
              <span className="text-gray-500 text-[11px] font-semibold text-center absolute -bottom-7">{data.week}</span>
            </div>
          ))}
        </div>

        {/* Chart Legend */}
        <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="w-3 h-3 rounded-full bg-linear-to-r from-emerald-600 to-green-400"></span>
            <span className="text-gray-600 text-xs font-semibold">Motor Skills</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="w-3 h-3 rounded-full bg-linear-to-r from-amber-600 to-yellow-400"></span>
            <span className="text-gray-600 text-xs font-semibold">Cognitive Skills</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="w-3 h-3 rounded-full bg-linear-to-r from-red-600 to-rose-400"></span>
            <span className="text-gray-600 text-xs font-semibold">Social Skills</span>
          </div>
        </div>
      </div>
    </div>
  );
}
