// import { Link } from "react-router";
import type { Session } from "../../types/Session";
import { Calendar, Clock, Play } from "lucide-react";
import { format } from "date-fns";
// import { useQuery } from "@tanstack/react-query";

export default function UpcomingSessions({
  sessions,
  // patientId,
}: {
  sessions: Session[];
  // patientId: string | undefined;
}) {
  // const { data, error, isPending } = useQuery({
  //   queryKey: ["UpcomingSessions"],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Session/patient/${patientId}/sessions?status=not-allowed`,
  //     );
  //     return response.json();
  //   },
  // });
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Upcoming Sessions</h2>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {session.title}
              </h3>
              <p className="text-gray-500 text-xs">{session.description}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(session.publishedAt), "MMM d, yyyy")}
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {session.duration.split(".")[0].substring(3)}
                </span>
              </div>
            </div>
            <span className="text-primary text-sm font-medium">
              {session.specialistName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
