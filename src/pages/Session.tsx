import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "../types/Session";
import { ArrowLeft, LoaderCircle, Sparkles, XCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import SessionAttempt from "../components/SessionComponents/PatientSessionComponents/SessionAttempt";

export default function Session() {
  const { user } = useAuth();
  const { sessionId } = useParams();
  const isFamily: boolean = user?.roles?.includes("Family") ?? false;

  const { data, isPending, error } = useQuery({
    queryKey: ["session", sessionId],
    enabled: Boolean(sessionId),
    queryFn: async () => {
      const response = await fetch(
        `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Session/SessionDetails/${sessionId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load session details");
      }

      return response.json();
    },
  });

  if (isPending) {
    return (
      <main className="h-[calc(100vh-150px)] flex items-center justify-center">
        <LoaderCircle className="animate-spin size-16 text-primary" />
      </main>
    );
  }

  if (error || !data?.data) {
    return (
      <main className="h-[calc(100vh-150px)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-red-100 p-8 text-center space-y-4">
          <div className="flex justify-center">
            <XCircle className="size-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to load session
          </h1>
          <p className="text-gray-600">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading this session. Please try again later."}
          </p>
          <Link
            to="/sessions"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to sessions
          </Link>
        </div>
      </main>
    );
  }

  const session: Session = data.data;

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap px-1">
          <Link
            to="/sessions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to sessions
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 text-green-800 px-5 py-2 text-sm font-semibold shadow-sm border border-green-400/40 backdrop-blur">
            <Sparkles className="size-4 text-green-600" />
            <span className="tracking-wide text-xs font-medium text-green-700">
              Score
            </span>
            <span className="font-extrabold">{session.score}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <video
            controls
            poster={session.thumbnailUrl || "cards.png"}
            className="w-full h-full aspect-video  bg-black"
          >
            <source src={session.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="bg-white shadow-md rounded-3xl px-6 sm:px-8 py-5 sm:py-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold sm:font-bold text-gray-900">
              {session.title || "Untitled Session"}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              {session.description ||
                "No description available for this session."}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-3xl px-6 sm:px-8 py-5 sm:py-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold sm:font-bold text-gray-900">
              Session Notes
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              {session.notes || "No notes available for this session."}
            </p>
          </div>
        </div>
      </section>
      {isFamily && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-gray-100 p-6 sm:p-9">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Instructions for Parents
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Follow these steps carefully to ensure a safe and effective
                session for your child.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">
                Step-by-Step Guide
              </h3>

              <ol className="space-y-4 sm:space-y-5">
                {[
                  "Set up your phone or camera to record your child's play area clearly.",
                  "Guide your child through the exercises just like the doctor demonstrated in the video.",
                  "Record their attempt (keep it between 2–5 minutes).",
                  "Upload the recorded video using the form on the right so the doctor can review their progress.",
                ].map((text, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="shrink-0 bg-green-200 p-1 rounded-full">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-t from-primary-dark to-green-500 text-white flex items-center justify-center font-semibold text-sm sm:text-base ">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <SessionAttempt sessionId={sessionId} patientId={user?.patientid?.toString()} /> 
          </div>
        </section>
      )}
    </main>
  );
}
