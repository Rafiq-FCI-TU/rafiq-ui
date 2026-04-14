import type { PatientCard } from "../../types/Patient";
import { format } from "date-fns";
import { Link } from "react-router";
import { Eye, Mail, Calendar } from "lucide-react";

export default function PatientCard({ patient }: { patient: PatientCard }) {
  const getBarColor = (score: number) => {
    if (score >= 70) return "bg-primary";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getAvatarUrl = (gender: string) => {
    return gender === "Female" ? "/f-down.jpg" : "/m-down.jpg";
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-300 ease-out">
      {/* Header with avatar */}
      <div className="bg-linear-to-br from-primary-dark to-primary p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={getAvatarUrl(patient.gender)}
              alt={patient.fullName}
              className="w-32 h-32 rounded-2xl bg-white/20 border-4 border-white/50 shadow-2xl object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-xl leading-tight truncate">
              {patient.fullName}
            </h3>
            <p className="text-white/80 text-sm mt-1.5 font-medium">
              {patient.age} years • {patient.gender}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-gray-50/80 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-2xl bg-primary animate-pulse" />
              Score
            </span>
            <span className="text-lg font-bold text-gray-900">
              {patient.totalScore.toFixed(2)}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-2xl overflow-hidden shadow-inner">
            <div
              className={`h-full ${getBarColor(patient.totalScore)} rounded-2xl shadow-lg transition-all duration-300 ease-out`}
              style={{ width: `${Math.max(patient.totalScore, 0)}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between group/item hover:bg-gray-50 p-2 -mx-2 rounded-2xl transition-colors duration-300">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-8 h-8 rounded-2xl bg-gray-100 flex items-center justify-center group-hover/item:bg-gray-200 transition-colors duration-300">
                <Mail className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-sm font-medium">Email</span>
            </div>
            <a
              href={`mailto:${patient.familyEmail}`}
              className="text-sm  font-medium text-gray-900 break-all text-right max-w-3/5 overflow-hidden text-ellipsis text-nowrap hover:text-primary transition-colors duration-300"
              title={patient.familyEmail}
            >
              {patient.familyEmail}
            </a>
          </div>

          <div className="flex items-center justify-between group/item hover:bg-gray-50 p-2 -mx-2 rounded-2xl transition-colors duration-300">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-8 h-8 rounded-2xl bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-200 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Assigned</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {format(new Date(patient.assignedAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <Link
          to={`/patients/${patient.patientId}`}
          className="shadow-md border-primary text-center hover:border-primary hover:bg-white hover:text-primary transition-all duration-300 border-2 gap-2 bg-primary text-white px-6 py-4 rounded-2xl flex items-center justify-center"
        >
          <Eye className="size-5" />
          View Details
        </Link>
      </div>
    </div>
  );
}
