import type { Session } from "../../../types/Session";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Video, XCircle } from "lucide-react";
import SpecialistSessionCard from "./SpecialistSessionCard";
import UploadSession from "./UploadSession";
import { useAuth } from "../../../contexts/AuthContext";
export default function SpecialistSessions() {
  const { user } = useAuth();
  const { data, isPending, error } = useQuery({
    queryKey: ["SpecialistSessions", user?.id],
    staleTime: 0,
    queryFn: () =>
      fetch(
        `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Session/specialist/${user?.id}`,
      ).then((res) => res.json()),
  });
  return (
    <main className="p-10 not-md:p-5 flex flex-col gap-4">
      <UploadSession />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Video className="text-primary" /> Uploaded Sessions
        </h2>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
          {data?.data?.length || 0} Sessions
        </span>
      </div>

      {isPending ? (
        <div className="h-[calc(100vh-500px)] flex items-center justify-center">
          <LoaderCircle className="animate-spin size-10 text-primary" />
        </div>
      ) : error ? (
        <div className="h-[calc(100vh-500px)] flex items-center justify-center">
          <XCircle className="text-red-500 size-10" />
          <span className="text-red-500 ml-2 text-lg font-bold">
            {error.message}
          </span>
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="h-[calc(100vh-500px)] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No sessions found
            </h3>
            <p className="text-gray-500">
              You don't have any uploaded sessions. Upload a new session.
            </p>
          </div>
        </div>
      ) : (
        data?.data?.map((session: Session) => {
          return <SpecialistSessionCard key={session.id} session={session} />;
        })
      )}
    </main>
  );
}
