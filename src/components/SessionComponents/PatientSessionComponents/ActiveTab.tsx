import { useAuth } from "../../../contexts/AuthContext";
import type { Session, SessionType } from "../../../types/Session";
import SessionCard from "./PatientSessionCard";
import { useQuery } from "@tanstack/react-query";
import { XCircle, LoaderCircle } from "lucide-react";
export default function ActiveTab({
  activeTab,
}: {
  activeTab: SessionType | "notes";
}) {
  const { user } = useAuth();
  const { data, error, isPending } = useQuery({
    queryKey: ["PatientSessions", activeTab, user?.patientId],
    staleTime: 0,
    gcTime: 0,
    queryFn: async () => {
      const response = await fetch(
        `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Session/patient/${user?.patientId}/sessions?status=${activeTab === "not-allowed" ? "not-allowed" : "allowed"}`,
      );
      return response.json();
    },
  });

  return (
    <div
      className={`p-10 not-md:p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 relative ${!data?.data && "justify-center items-center min-h-[400px]"}`}
    >
      {isPending ? (
        <div className="col-span-full flex items-center justify-center">
          <LoaderCircle className="animate-spin size-10 text-primary" />
        </div>
      ) : error ? (
        <div className="col-span-full flex items-center justify-center">
          <XCircle className="text-red-500 size-10" />
          <span className="text-red-500 ml-2 text-lg font-bold">
            {error.message}
          </span>
        </div>
      ) : !data?.success && data?.message === "No sessions found" ? (
        <div className="col-span-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No sessions found
            </h3>
            <p className="text-gray-500">
              {activeTab === "not-allowed"
                ? "You don't have any upcoming sessions yet."
                : "You don't have any available sessions yet."}
            </p>
          </div>
        </div>
      ) : (
        data?.data?.map((session: Session) => (
          <SessionCard
            key={session.id}
            session={session}
            type={activeTab === "notes" ? "allowed" : activeTab}
          />
        ))
      )}
    </div>
  );
}
