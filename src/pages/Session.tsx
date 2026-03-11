import { useState } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "../types/Session";
import {
  ArrowLeft,
  LoaderCircle,
  Sparkles,
  UploadCloud,
  XCircle,
} from "lucide-react";

export default function Session() {
  const { sessionId } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["session", sessionId],
    enabled: Boolean(sessionId),
    queryFn: async () => {
      const response = await fetch(
        `https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/Session/SessionDetails/${sessionId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load session details");
      }

      return response.json();
    },
  });

  if (isPending) {
    return (
      <main className="h-[calc(100vh-300px)] flex items-center justify-center">
        <LoaderCircle className="animate-spin size-16 text-primary" />
      </main>
    );
  }

  if (error || !data?.data) {
    return (
      <main className="h-[calc(100vh-300px)] flex items-center justify-center px-4">
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

  const session = data.data;

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap px-1">
          <div className="flex items-center gap-4">
            <Link
              to="/sessions"
              className="flex items-center justify-center bg-white shadow-md shadow-green-100 text-primary p-3 rounded-full gap-2 text-sm font-semibold hover:bg-primary hover:text-white hover:scale-105 transition-all"
            >
              <ArrowLeft className="size-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {session.title}
            </h1>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full bg-emerald-500/10 text-emerald-800 px-5 py-2 text-sm font-semibold shadow-sm border border-emerald-400/40 backdrop-blur">
            <Sparkles className="size-4 text-emerald-600" />
            <span className="uppercase tracking-[0.16em] text-[11px] text-emerald-700">
              Child Score
            </span>
            <span className="text-base font-extrabold">
              {session.score}
              <span className="text-xs font-medium text-emerald-600 ml-1">
                pts
              </span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-[0_18px_45px_rgba(15,23,42,0.12)] overflow-hidden border border-slate-100">
          <video
            controls
            controlsList="nodownload"
            poster={session.thumbnailUrl || "cards.png"}
            className="w-full h-full  aspect-video object-cover bg-black"
          >
            <source src={session.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-[32px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] border border-slate-100 p-6 sm:p-9">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Instructions for Parents
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Follow these steps carefully to ensure a safe and effective
              session for your child.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-5">
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
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white rounded-[32px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] border border-slate-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Upload Child&apos;s Attempt
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Securely upload the video of your child doing the exercises.
            </p>

            <label
              htmlFor="session-upload"
              className="group flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 rounded-[24px] px-4 py-10 text-center cursor-pointer hover:border-primary/70 hover:bg-primary/5 transition-colors bg-slate-50/60"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-1 shadow-[0_12px_30px_rgba(37,99,235,0.35)]">
                <UploadCloud className="size-7 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-semibold text-slate-900">
                  Drag and drop your video
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  MP4, MOV up to 50MB
                </p>
              </div>
              <div className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold group-hover:bg-primary transition-colors shadow-[0_10px_30px_rgba(15,23,42,0.5)]">
                <UploadCloud className="size-4" />
                <span>Browse files</span>
              </div>
              <input
                id="session-upload"
                type="file"
                accept="video/mp4,video/quicktime"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setSelectedFile(file);
                }}
              />
            </label>

            {selectedFile && (
              <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-left space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Selected file
                </p>
                <p className="text-sm font-medium text-slate-900 break-all">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
            )}

            <button
              type="button"
              disabled={!selectedFile}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3.5 text-sm sm:text-base disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-[0_14px_35px_rgba(37,99,235,0.45)] disabled:shadow-none"
            >
              <UploadCloud className="size-4" />
              <span>Submit video for review</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
