import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SpecialistCard from "../components/SpecialistComponents/SpecialistCard";
import { type Specialist } from "../types/Specialist";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { X, Loader2, SearchX } from "lucide-react";

export default function Specialist() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: specialists,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["specialists"],
    queryFn: async () => {
      const req = await axios.get(
        "https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Specialist",
      );
      return req.data?.data;
    },
  });
  const filteredSpecialists: Specialist[] = useMemo(() => {
    return specialists?.filter((specialist: Specialist) => {
      const fullName = specialist.fullName.toLowerCase();
      const specialty = specialist.specialty.toLowerCase();
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || specialty.includes(search);
    });
  }, [searchTerm, specialists]);

  return (
    <div className="mx-auto  p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Specialist
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
          disabled={isFetching}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isFetching ? (
          <div className="col-span-full py-20 text-center ">
            <div className="mb-4 flex justify-center text-primary">
              <Loader2 className="animate-spin size-20" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">
              Loading specialists...
            </h3>
            <p className="text-green-600">Please wait a moment.</p>
          </div>
        ) : error ? (
          <div className="col-span-full py-20 text-center">
            <div className="mb-4 flex justify-center">
              <X className="size-20 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Failed loading specialists
            </h3>
            <p className="text-red-600">Please try again later.</p>
          </div>
        ) : filteredSpecialists && filteredSpecialists.length > 0 ? (
          filteredSpecialists.map((specialist: Specialist) => (
            <SpecialistCard key={specialist.id} specialist={specialist} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="flex justify-center mb-4">
              <SearchX className="size-20" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No specialists found
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
