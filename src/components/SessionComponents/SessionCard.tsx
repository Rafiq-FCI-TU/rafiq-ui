import type { Session, SessionType } from "../../types/Session";
import { Lock, Clock, CalendarDays, Video } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
export default function SessionCard({
  session,
  type,
}: {
  session: Session;
  type: SessionType;
}) {
  return (
    <div className="flex flex-col shadow-md border border-gray-200 rounded-3xl">
      <div className="relative">
        <img
          className="w-full object-cover aspect-video rounded-t-3xl"
          src={session.thumbnailUrl || "cards.png"}
          alt={session.title}
          loading="lazy"
        />
        <div className="text-white bg-black px-3 py-1 rounded-full absolute top-3 right-3 flex items-center gap-2">
          <Clock className="size-4" /> {session.duration}
        </div>
        <span
          className={`${
            type === "not-allowed" ? "bg-red-600" : "bg-primary"
          } text-white p-2 size-10 rounded-full absolute bottom-3 left-3 flex items-center justify-center`}
        >
          {session.score}
        </span>
        {type === "not-allowed" && (
          <span className="absolute p-4 flex rounded-full bg-white items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Lock className="size-8" />
          </span>
        )}
      </div>
      <div className="p-5 space-y-5">
        <h3 className="font-semibold text-lg">{session.title}</h3>
        <p className="text-md text-gray-600">{session.description}</p>
        <p className="text-md text-gray-500 flex items-center gap-2 border-t border-gray-200 pt-2">
          <CalendarDays className="size-4" />
          {format(session.publishedAt, "MMMM d, yyyy")}
        </p>
        {type === "allowed" && (
          <Link
            to={`/sessions/${session.id}`}
            className="flex items-center justify-center hover:border-primary hover:bg-white hover:text-primary transition-all border-2 gap-2 bg-primary text-white px-4 py-2 rounded-full"
          >
            <Video /> Watch & Record
          </Link>
        )}
      </div>
    </div>
  );
}
