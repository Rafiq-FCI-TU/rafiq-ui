import { useParams, Link } from "react-router";
import type { Patient as PatientType } from "../types/Patient";
import type { Session } from "../types/Session";
import { ArrowLeft, Calendar, User, Venus, Mars } from "lucide-react";
import { format, differenceInYears } from "date-fns";
import { useState, useMemo } from "react";
import UpcomingSessions from "../components/PatientComponents/UpcomingSessions";

// Mock data using only Patient and Session interfaces
// Replace with actual API calls
const mockPatient: PatientType = {
  id: 1,
  firstName: "Emma",
  lastName: "Johnson",
  fullName: "Emma Johnson",
  dateOfBirth: "2017-05-15",
  gender: "Female",
  totalScore: 84,
  familyProfileId: "fam-001",
  assessmentId: 1,
};

const mockSessions: Session[] = [
  {
    id: 1,
    title: "Initial Assessment",
    description: "Comprehensive speech and language evaluation",
    videoUrl: "",
    duration: "00:00:00.000",
    sequence: 1,
    score: 85,
    publishedAt: "2026-02-26T10:00:00",
    thumbnailUrl: "",
    specialistProfileId: "spec-001",
    specialistName: "Dr. Sarah Smith",
    notes: "First session scheduled",
  },
  {
    id: 2,
    title: "Follow-up Session",
    description: "Progress review and next steps",
    videoUrl: "",
    duration: "00:00:00.000",
    sequence: 2,
    score: 0,
    publishedAt: "2026-03-05T14:00:00",
    thumbnailUrl: "",
    specialistProfileId: "spec-001",
    specialistName: "Dr. Sarah Smith",
    notes: "Second session",
  },
];

function calculateAge(dateOfBirth: string): number {
  return differenceInYears(new Date(), new Date(dateOfBirth));
}

function getAvatarUrl(gender: string): string {
  return gender === "Female" ? "/f-down.jpg" : "/m-down.jpg";
}

export default function Patient() {
  const { patientId } = useParams();
  const [patient] = useState(mockPatient);
  const [upcomingSessions] = useState(mockSessions);

  const age = useMemo(
    () => calculateAge(patient.dateOfBirth),
    [patient.dateOfBirth],
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Link */}
      <Link
        to="/patients"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Patients</span>
      </Link>

      {/* Header Card */}
      <div className="bg-linear-to-br from-primary-dark to-primary rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <img
              src={getAvatarUrl(patient.gender)}
              alt={patient.fullName}
              className="w-32 h-32 rounded-2xl bg-white/20 border-4 border-white/50 shadow-2xl object-cover"
            />
          </div>
          <div className="flex-1 w-full min-w-0">
            <h1 className="font-bold text-white text-2xl md:text-3xl leading-tight truncate">
              {patient.fullName}
            </h1>
            <div className="mt-3 max-w-4xl bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/80 text-xs font-medium">
                  Total Score
                </span>
                <span className="text-white text-sm font-bold">
                  {patient.totalScore}%
                </span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${patient.totalScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingSessions sessions={upcomingSessions} patientId={patientId} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Patient Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Age</p>
                  <p className="text-gray-900 text-sm font-medium">
                    {age} years old
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  {patient.gender === "Female" ? (
                    <Venus className="w-4 h-4 text-green-600" />
                  ) : (
                    <Mars className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Gender</p>
                  <p className="text-gray-900 text-sm font-medium">
                    {patient.gender}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Date of Birth</p>
                  <p className="text-gray-900 text-sm font-medium">
                    {format(new Date(patient.dateOfBirth), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
