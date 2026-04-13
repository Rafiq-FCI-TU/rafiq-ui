import { Award, Mail, Star, Loader2, UserX } from "lucide-react";
import type { SpecialistApiResponse } from "../../../types/Specialist";

interface SpecialistDetailsCardProps {
  isLoading: boolean;
  error: string | null;
  specialistData: SpecialistApiResponse['data'] | null;
}

export default function SpecialistDetailsCard({ isLoading, error, specialistData }: SpecialistDetailsCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-200 p-8 mb-8 flex flex-col items-center justify-center min-h-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
        <p className="text-gray-500 text-sm font-medium">Loading specialist information...</p>
      </div>
    );
  }

  if (error || !specialistData) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-200 p-8 mb-8 flex flex-col items-center justify-center min-h-50">
        <UserX className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-gray-500 text-sm font-medium">
          {error || "No Specialist Assigned"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow duration-300">
      <img
        src="mdoctor.png"
        alt={specialistData.fullName}
        className="w-full md:w-48 md:h-48 rounded-xl object-cover border border-gray-100"
        onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/300' }}
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">{specialistData.fullName}</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100/50 w-fit mt-2 md:mt-0">
              <Award className="w-4 h-4" />
              {specialistData.specialty}
            </div>
          </div>
          <h3 className="text-green-600 font-bold text-sm mb-4">
            {specialistData.credentials}
          </h3>
          <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
            {specialistData.professionalBio}
          </p>
        </div>

        <div className="flex flex-wrap gap-y-4 gap-x-12 text-sm border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-400 text-xs">Organization</p>
              <p className="font-bold text-gray-700 text-xs mt-0.5">{specialistData.organization}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-xs">Patients</p>
              <p className="font-bold text-gray-700 text-xs mt-0.5">{specialistData.patientsCount} patients</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-400 text-xs">Email</p>
              <p className="font-bold text-gray-700 text-xs mt-0.5">{specialistData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
