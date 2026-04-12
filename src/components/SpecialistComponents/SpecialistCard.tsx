import { User, Award } from "lucide-react";
import type { Specialist } from "../../types/Specialist";
import { Link } from "react-router";

export default function SpecialistCard({
  specialist,
}: {
  specialist: Specialist;
}) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5">
      <img
        src={
          specialist.gender.toLocaleLowerCase() === "male"
            ? "/mdoctor.png"
            : "/fdoctor.png"
        }
        alt={`Dr. ${specialist.fullName}`}
        className="w-full object-cover aspect-video rounded-2xl"
      />
      <div className="flex flex-col justify-between h-full gap-5">
        <div className="flex flex-col grow">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Dr. {specialist.fullName}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-primary">
                <Award className="size-4" />
                <span className="ml-1 font-semibold">
                  {specialist.specialty}
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center text-primary">
                <User className="size-4" />
                <span className="ml-1 font-semibold">
                  {specialist.patientsCount} patient
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600">{specialist.professionalBio}</p>
        </div>

        <Link
          to={`/specialist/${specialist.id}`}
          className="shadow-md border-primary text-center hover:border-primary hover:bg-white hover:text-primary transition-all border-2 gap-2 bg-primary text-white px-6 py-4 rounded-2xl"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
