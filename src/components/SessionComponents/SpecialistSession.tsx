import { useQuery } from "@tanstack/react-query";
import UploadSession from "./UploadSession";
import type { Session } from "../../types/Session";
import { LoaderCircle, Video, XCircle } from "lucide-react";
import SpecialistSessionCard from "./SpecialistSessionCard";
export default function SpecialistSessions() {
  const specialistId = "e5c04f7c-0982-4b7a-9295-7c5313b2f0fb";
  const { data, isPending, error } = useQuery({
    queryKey: ["sessions"],
    staleTime:  0,
    queryFn: () =>
      fetch(
        `https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/Session/specialist/${specialistId}`,
      ).then((res) => res.json()),
  });
  return (
    <main className="p-10 not-md:p-2 flex flex-col gap-4">
      <UploadSession />
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Video className="text-primary" /> Uploaded Sessions
      </h2>

      {isPending ? (
        <div className="h-[calc(100vh-300px)] flex items-center justify-center">
          <LoaderCircle className="animate-spin size-10 text-primary" />
        </div>
      ) : error ? (
        <div className="h-[calc(100vh-300px)] flex items-center justify-center">
          <XCircle className="text-red-500 size-10" />
          <span className="text-red-500 ml-2 text-lg font-bold">
            {error.message}
          </span>
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="h-[calc(100vh-300px)] flex items-center justify-center">
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
