import { Activity, Video, Users, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function Overview() {
  return (
    <div>
      <div className="flex items-center gap-2 text-green-600 font-bold text-xs tracking-widest uppercase mb-4 ml-1">
        <div className="w-2 h-2 rounded-full bg-linear-to-r from-green-500 to-emerald-500 animate-pulse"></div> 
        OVERVIEW
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100">
          <div className="flex items-start justify-between w-full mb-4">
            <div className="flex gap-3 items-center">
               <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                 <Activity className="w-6 h-6" />
               </div>
               <div className="flex flex-col">
                  <h3 className="font-bold text-gray-900 text-base">Uploaded Sessions</h3>
                  <p className="text-xs text-gray-500 mt-0.5 text-left font-medium">recorded sessions</p>
               </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" />
              <span className="text-xs font-bold">75%</span>
            </div>
          </div>
          <div className="flex justify-center items-center pb-2 flex-1">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                 <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 <path className="text-green-500" strokeDasharray="75, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-black text-green-600 leading-none">15</span>
                 <span className="text-[10px] text-gray-500 mt-0.5 uppercase font-bold tracking-wide">of 20</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">This week</span>
              <span className="text-green-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5 sessions
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100">
          <div className="flex items-start justify-between w-full mb-4">
            <div className="flex gap-3 items-center">
               <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                 <Video className="w-6 h-6" />
               </div>
               <div className="flex flex-col">
                  <h3 className="font-bold text-gray-900 text-base">Parent Videos</h3>
                  <p className="text-xs text-gray-500 mt-0.5 text-left font-medium">videos submitted by parents</p>
               </div>
            </div>
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" />
              <span className="text-xs font-bold">60%</span>
            </div>
          </div>
          <div className="flex justify-center items-center pb-2 flex-1">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                 <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 <path className="text-blue-500" strokeDasharray="60, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-black text-blue-600 leading-none">12</span>
                 <span className="text-[10px] text-gray-500 mt-0.5 uppercase font-bold tracking-wide">of 20</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">This week</span>
              <span className="text-blue-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +3 videos
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100">
          <div className="flex items-start justify-between w-full mb-4">
            <div className="flex gap-3 items-center">
               <div className="w-12 h-12 rounded-xl bg-linear-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                 <Users className="w-6 h-6" />
               </div>
               <div className="flex flex-col">
                  <h3 className="font-bold text-gray-900 text-base">Active Children</h3>
                  <p className="text-xs text-gray-500 mt-0.5 text-left font-medium">children in active therapy</p>
               </div>
            </div>
            <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" />
              <span className="text-xs font-bold">85%</span>
            </div>
          </div>
          <div className="flex justify-center items-center pb-2 flex-1">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                 <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 <path className="text-rose-500" strokeDasharray="85, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-black text-rose-600 leading-none">17</span>
                 <span className="text-[10px] text-gray-500 mt-0.5 uppercase font-bold tracking-wide">of 20</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">This week</span>
              <span className="text-rose-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2 active
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
