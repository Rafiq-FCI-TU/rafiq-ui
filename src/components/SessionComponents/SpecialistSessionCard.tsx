import { CalendarDays } from "lucide-react";
import type { Session } from "../../types/Session";
import { format } from "date-fns";
import { Link } from "react-router";

export default function SpecialistSessionCard({
  session,
}: {
  session: Session;
}) {
  return (
    <Link
      to={`/session/${session.id}`}
      className="flex gap-5 shadow-md border hover:scale-105 transition-all border-gray-200 rounded-2xl p-4"
    >
      <img
        src={session.thumbnailUrl || "cards.png"}
        className="rounded-2xl  aspect-video object-cover"
        alt={session.title}
      />
      <div className=" flex flex-col  justify-between content-start">
        <h3 className="text-lg font-semibold">{session.title}</h3>
        <p className="text-sm text-gray-600">{session.description}</p>
        <span className="text-xs text-gray-500 flex items-center justify-between gap-2 bg-gray-100 px-2 py-1 rounded-full">
          <CalendarDays className="size-4" />{" "}
          {format(new Date(session.publishedAt), "MMMM d, yyyy")}
        </span>
      </div>
    </Link>
  );
}
