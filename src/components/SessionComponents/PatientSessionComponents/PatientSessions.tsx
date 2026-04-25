import {
  CalendarDays,
  Video,
  Stethoscope,
  CheckCircle2,
  Star,
} from "lucide-react";
import { useState } from "react";
import type { Tab } from "../../../types/Session";
import ActiveTab from "./ActiveTab";
import TapButton from "./TapButton";
import { Link } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
export default function PatientSessions() {
  const { user } = useAuth();
  const [tabs, setTabs] = useState<Tab[]>([
    {
      name: "Available Sessions",
      active: true,
      icon: <Video className="size-5 not-sm:size-4" />,
      type: "allowed",
    },
    {
      name: "Upcoming Sessions",
      active: false,
      icon: <CalendarDays className="size-5 not-sm:size-4" />,
      type: "not-allowed",
    },
  ]);

  if (!user?.specialistId) {
    return (
      <div className="flex justify-center items-center p-5">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-primary/20 shadow-sm p-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
            <Stethoscope className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Session Journey
          </h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            To access personalized movement therapy sessions for your child, you
            need to book a consultation with a specialized doctor first.
          </p>
          <div className="w-full bg-gray-50 rounded-2xl p-8 mb-10 text-left border border-gray-100 shadow-inner">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              What you'll get:
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">
                  Personalized therapy videos based on your child's skill level
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">
                  Step-by-step guidance for safe movement exercises
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">
                  Regular feedback and clinical notes from your doctor
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">
                  Track progress with points and unlocked content
                </span>
              </li>
            </ul>
          </div>
          <Link
            to={"/specialist"}
            className="bg-linear-to-r from-primary-dark to-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <Stethoscope className="w-5 h-5" />
            Assign Your Specialist Now
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <main>
        <section className="p-10 not-md:p-2 border-b border-gray-200 shadow-md bg-white">
          <div className="flex justify-between items-start  mb-6">
            <div className="space-y-4 max-w-lg not-sm:flex-2  flex-4">
              <h1 className="text-4xl font-bold text-primary">
                Therapy Sessions
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Track your child's progress, record prescribed exercises, and
                review clinical feedback directly from your doctor.
              </p>
            </div>
            <div className="border-3 border-white shadow-md shadow-primary/20 rounded-2xl px-4 py-3 not-md:p-2  flex items-center text-center gap-2 not-md:flex-col not-md:flex-0.5">
              <Star className="size-8 text-primary fill-primary" />
              <div>
                <div className="text-sm font-extrabold text-primary uppercase tracking-wide">
                  CHILD SCORE
                </div>
                <div className="text-xl font-bold text-gray-700">
                  {user.score?.toFixed(2)}
                  <span className="text-sm text-gray-500"> pts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-fit items-center gap-4 not-sm:gap-1 bg-white rounded-full shadow-sm border border-gray-200 p-4 not-sm:p-2 mb-6">
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
}
