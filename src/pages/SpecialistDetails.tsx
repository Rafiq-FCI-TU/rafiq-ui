import {
  ArrowLeft,
  Star,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Award,
} from "lucide-react";
import { Link, useParams } from "react-router";
import type { SpecialistDetails } from "../types/Specialist";

// Mock data for Dr. Sarah Mitchell based on the image
const MOCK_SPECIALIST: SpecialistDetails = {
  id: "1",
  fullname: "Sarah Mitchell",
  specialty: "Developmental Pediatrician",
  rating: parseFloat((Math.random() * 5).toFixed(2)),
  experienceYears: Math.round(Math.random() * 30),
  bio: "Specialized in Down syndrome therapy with extensive experience in pediatric developmental care. Dr. Mitchell focuses on personalized treatment plans to enhance motor, cognitive, and social skills.",
  imageUrl: "/Mitchell.png",
  education: [
    "MD - Harvard Medical School",
    "Pediatrics Residency - Johns Hopkins Hospital",
    "Fellowship in Developmental Pediatrics - Boston Children's Hospital",
  ],
  specializations: [
    "Down Syndrome Care",
    "Motor Skills Development",
    "Cognitive Enhancement",
    "Social Skills Training",
    "Early Intervention",
  ],
};

export default function SpecialistDetails() {
  const { id } = useParams();

  // In a real app, you would fetch data using the id
  console.log("Fetching specialist with id:", id);
  const specialist = MOCK_SPECIALIST;

  return (
    <div className="bg-gray-50/30 mb-15">
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
            src={specialist.imageUrl}
            alt={`Dr. ${specialist.fullname}`}
            className="w-48 h-48 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Dr. {specialist.fullname}
            </h1>
            <p className="text-xl text-primary font-semibold mb-4">
              {specialist.specialty}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="size-5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-900">
                  {specialist.rating}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-5 text-primary" />
                <span className="font-medium text-gray-700">
                  {specialist.experienceYears} years experience
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">{specialist.bio}</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Education Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="size-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Education</h2>
            </div>
            <ul className="space-y-4">
              {specialist.education.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-600 leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award className="size-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">
                Specializations
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {specialist.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-50 text-primary font-semibold rounded-2xl text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button Container */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-center">
          <button className="w-full max-w-6xl lg:ml-[256px] cursor-pointer border-primary text-center hover:border-primary hover:bg-white hover:text-primary  border-2 gap-2 bg-primary text-white py-[7px] px-8 rounded-2xl shadow-lg transition-all text-lg">
            Book This Doctor
          </button>
        </div>
      </div>
    </div>
  );
}
