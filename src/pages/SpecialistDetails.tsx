import {
  ArrowLeft,
  BriefcaseMedical,
  BadgeInfo,
  Award,
  Loader2,
  User,
  X,
  GraduationCap,
  Mail,
  UserPlus,
} from "lucide-react";
import { Link, useParams } from "react-router";
import type { Specialist } from "../types/Specialist";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
export default function SpecialistDetails() {
  const { specialistId } = useParams();
  const { user, setUser } = useAuth();
  const { data, error, isFetching } = useQuery({
    queryKey: ["specialistDetails"],
    queryFn: async () => {
      const req = await axios.get(
        `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/specialist/${specialistId}`,
      );

      return req.data?.data;
    },
  });
  const specialist: Specialist = data;

  return (
    <div className="bg-gray-50/30 mb-15">
      {isFetching ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <div className="mb-4 flex justify-center text-primary">
            <Loader2 className="animate-spin size-20" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-800">
            Loading specialist...
          </h3>
          <p className="text-green-600">Please wait a moment.</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <div className="mb-4 flex justify-center">
            <X className="size-20 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Failed loading specialists
          </h3>
          <p className="text-red-600">Please try again later.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Navigation */}
          <Link
            to="/specialist"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="size-5 mr-2" />
            <span className="font-medium text-lg">Go Back</span>
          </Link>

          {/* Main Info Card */}
          <div className="bg-white rounded-2xl flex flex-col md:flex-row gap-8 border border-gray-100 p-8 shadow-sm mb-6">
            <img
              src={
                specialist.gender.toLowerCase() === "male"
                  ? "/mdoctor.png"
                  : "/fdoctor.png"
              }
              alt={`Dr. ${specialist.fullName}`}
              className="w-48 h-48 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Dr. {specialist.fullName}
              </h1>
              <p className="flex items-center gap-2 text-xl text-primary font-semibold mb-4">
                <Award className="size-5 text-primary" />
                {specialist.specialty}
              </p>

              <p className="text-gray-600 leading-relaxed">
                {specialist.professionalBio}
              </p>
            </div>
          </div>

          {/* Info Card */}

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <BadgeInfo className="size-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Information</h2>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <span className="font-medium text-gray-900">
                  Email: {specialist.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <BriefcaseMedical className="size-5 text-primary" />
                <span className="font-medium text-gray-900">
                  Organization: {specialist.organization}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap className="size4 text-primary " />
                <span className="font-medium text-gray-900">
                  Credentials: {specialist.credentials}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserPlus className="size4 text-primary " />
                <span className="font-medium text-gray-900">
                  Patients: {specialist.patientsCount}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User className="size4 text-primary " />
                <span className="font-medium text-gray-900">
                  Gender: {specialist.gender}
                </span>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-center">
            {user?.specialistId === specialistId ? (
              <button
                className="w-full max-w-6xl lg:ml-[256px] cursor-pointer border-red-500 text-center hover:border-red-500 hover:bg-white hover:text-red-500  border-2 gap-2 bg-red-500 text-white py-[7px] px-8 rounded-2xl shadow-lg transition-all text-lg"
                onSubmit={() => {
                  fetch(
                    `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Specialist/${specialistId}/patients/${user?.patientId}`,
                    {
                      method: "DELETE",
                    },
                  ).then(() => {
                    setUser({ ...user, specialistId: null });
                    localStorage.setItem(
                      "user",
                      JSON.stringify({ ...user, specialistId: null }),
                    );
                  }).catch((e)=>console.log(e));
                }}
              >
                Unassign This Specialist
              </button>
            ) : (
              <button
                className="w-full max-w-6xl lg:ml-[256px] cursor-pointer border-primary text-center hover:border-primary hover:bg-white hover:text-primary  border-2 gap-2 bg-primary text-white py-[7px] px-8 rounded-2xl shadow-lg transition-all text-lg"
                onSubmit={() => {
                  fetch(
                    `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Specialist/${specialistId}/patients/${user?.patientId}`,
                    {
                      method: "POST",
                    },
                  ).then(() => {
                    setUser({ ...user, specialistId: specialistId });
                    localStorage.setItem(
                      "user",
                      JSON.stringify({ ...user, specialistId: specialistId }),
                    );
                  }).catch((e) => console.log(e));
                }}
              >
                Assign This Specialist
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
