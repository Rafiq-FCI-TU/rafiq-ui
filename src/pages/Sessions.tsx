import type { Tab } from "../types/Session";
import {
  Star,
  MessageCircle,
  ShieldCheckIcon,
  Video,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";
import TapButton from "../components/SessionComponents/TapButton";
import ActiveTab from "../components/SessionComponents/ActiveTab";

export default function Sessions() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      name: "Upcoming Sessions",
      active: true,
      icon: <CalendarDays className="size-5 not-sm:hidden" />,
      type: "not-allowed",
    },
    {
      name: "Recordings",
      active: false,
      icon: <Video className="size-5 not-sm:hidden" />,
      type: "allowed",
    },
    {
      name: "Clinical Notes",
      active: false,
      icon: <MessageCircle className="size-5 not-sm:hidden" />,
      type: "notes",
    },
  ]);

  return (
    <main>
      <section className="p-10 not-md:p-2 border-b border-gray-200 shadow-md">
        <div className="flex justify-between items-start  mb-6">
          <div className="space-y-4 max-w-lg not-sm:flex-2  flex-4">
            <h1 className="text-4xl font-bold">
              Emma's <span className="text-primary">Therapy Sessions</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Track your child's progress, record prescribed exercises, and
              review clinical feedback directly from your doctor.
            </p>
          </div>

          <div className="border-3 border-white shadow-xl shadow-green-100 rounded-2xl px-4 py-3 flex items-center text-center gap-4 not-md:flex-col not-md:flex-1">
            <Star className="size-12 text-yellow-400 fill-yellow-400" />
            <div>
              <div className="text-sm font-extrabold text-primary uppercase tracking-wide">
                CHILD SCORE
              </div>
              <div className="text-4xl font-bold text-gray-700">
                100<span className="text-sm text-gray-500"> pts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-full shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white border-2 border-green-100 p-1 rounded-full overflow-hidden">
                <img
                  src="welcome.png"
                  alt="Dr. Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg text-black font-bold">
                  Dr. Sarah Johnson
                </h3>
                <p className="text-gray-600 text-md flex items-center gap-1">
                  Your Assigned Doctor
                  <ShieldCheckIcon className="w-4 h-4 text-primary" />
                </p>
              </div>
            </div>
            <button className="hover:bg-primary hover:text-white p-3 rounded-full bg-gray-100 text-gray-600 transition-all shadow-md hover:shadow-primary cursor-pointer">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 not-sm:gap-1 bg-white rounded-full shadow-sm border border-gray-200 p-4 not-sm:p-2 mb-6">
          {tabs.map((tab) => (
            <TapButton key={tab.name} tab={tab} setTabs={setTabs} />
          ))}
        </div>
      </section>
      <ActiveTab
        activeTab={tabs.find((tab) => tab.active)?.type || tabs[0].type}
      />
    </main>
  );
}
