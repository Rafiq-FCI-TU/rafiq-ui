import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SpecialistCard from "../components/SpecialistComponents/SpecialistCard";
import type { SpecialistCard as SpecialistCardType } from "../types/Specialist";

const MOCK_SPECIALISTS: SpecialistCardType[] = [
  {
    id: "1",
    fullname: "Sarah Mitchell",
    specialty: "Cardiologist",
    rating: 4.9,
    experienceYears: 12,
    bio: "Board-certified cardiologist specializing in interventional cardiology and heart disease prevention. Passionate about patient education and comprehensive cardiac care.",
    imageUrl: "cards.png",
  },
  {
    id: "2",
    fullname: "Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    experienceYears: 15,
    bio: "Neurologist with expertise in movement disorders and epilepsy. Published researcher in neurodegenerative diseases and dedicated to advancing neurological treatments.",
    imageUrl: "cards.png",
  },
  {
    id: "3",
    fullname: "Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    experienceYears: 10,
    bio: "Pediatrician focused on developmental pediatrics and childhood wellness. Creates a warm, friendly environment for children and their families.",
    imageUrl: "cards.png",
  },
  {
    id: "4",
    fullname: "James Thompson",
    specialty: "Dermatologist",
    rating: 4.7,
    experienceYears: 8,
    bio: "Dermatologist specializing in medical and cosmetic dermatology. Expert in skin cancer detection, acne treatment, and anti-aging procedures.",
    imageUrl: "cards.png",
  },
  {
    id: "5",
    fullname: "Lisa Anderson",
    specialty: "Psychiatrist",
    rating: 4.8,
    experienceYears: 18,
    bio: "Psychiatrist with expertise in anxiety disorders, depression, and trauma therapy. Uses evidence-based approaches including cognitive behavioral therapy.",
    imageUrl: "cards.png",
  },
  {
    id: "6",
    fullname: "Robert Williams",
    specialty: "General Practitioner",
    rating: 4.6,
    experienceYears: 20,
    bio: "Experienced family physician providing comprehensive primary care for all ages. Focuses on preventive medicine and chronic disease management.",
    imageUrl: "cards.png",
  },
  {
    id: "7",
    fullname: "Maria Garcia",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    experienceYears: 14,
    bio: "Orthopedic surgeon specializing in sports medicine and joint replacement surgery. Helps patients regain mobility and return to active lifestyles.",
    imageUrl: "cards.png",
  },
  {
    id: "8",
    fullname: "Kevin Park",
    specialty: "Endocrinologist",
    rating: 4.7,
    experienceYears: 11,
    bio: "Endocrinologist focused ",
    imageUrl: "cards.png",
  },
];

export default function Specialist() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpecialists = useMemo(() => {
    return MOCK_SPECIALISTS.filter((specialist) => {
      const fullName = specialist.fullname.toLowerCase();
      const specialty = specialist.specialty.toLowerCase();
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || specialty.includes(search);
    });
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Doctor
        </h1>
        <p className="text-gray-600">
          Browse our team of specialized healthcare professionals
        </p>
      </header>

      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
          placeholder="Search doctors by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpecialists.length > 0 ? (
          filteredSpecialists.map((specialist) => (
            <SpecialistCard key={specialist.id} specialist={specialist} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
