import type { Session, SessionType } from "../../../types/Session";
import { Lock, Clock, CalendarDays, Video, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
export default function PatientSessionCard({
  session,
  type,
}: {
  session: Session;
  type: SessionType;
}) {
  return (
    <div className="flex flex-col  hover:scale-102 transition-all shadow-md border border-gray-200 rounded-3xl">
      <div className="relative">
        <img
          className="w-full object-cover aspect-video rounded-t-3xl"
          src={session.thumbnailUrl || "cards.png"}
          alt={session.title}
          loading="lazy"
        />

        <div className="text-black shadow-md backdrop-blur-lg bg-white/70 px-3 py-1 rounded-full absolute top-3 right-3 flex items-center gap-2">
          <Clock className="size-4" />{" "}
          {session.duration.split(".")[0].substring(3)}
        </div>
        <span
          className={` ${
            type === "not-allowed" ? " text-red-800" : " text-primary"
          } text-sm backdrop-blur-lg bg-white/70 px-3 py-1 rounded-full shadow-md absolute bottom-3 left-3 flex items-center gap-2`}
        >
          <Sparkles className="size-4" /> Score {session.score}
        </span>
        {type === "not-allowed" && (
          <span className="absolute backdrop-blur-lg text-red-800 bg-white/40 shadow-md p-4 flex rounded-full items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Lock className="size-8" />
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between h-full gap-5">
        <h3 className="font-semibold text-lg">{session.title}</h3>
        <p className="text-md text-gray-600">{session.description}</p>
        <p className="text-md text-gray-500 flex items-center gap-2 border-t border-gray-200 pt-2">
          <CalendarDays className="size-4" />
          Uploaded: {" "}
          {format(session.publishedAt, "MMMM d, yyyy")}
        </p>
        {type === "allowed" && (
          <Link
            to={`/sessions/${session.id}`}
            className="flex items-center justify-center shadow-md border-primary hover:border-primary hover:bg-white hover:text-primary transition-all border-2 gap-2 bg-primary text-white px-4 py-2 rounded-full"
          >
            <Video /> Watch & Record
          </Link>
        )}
      </div>
    </div>
  );
}
