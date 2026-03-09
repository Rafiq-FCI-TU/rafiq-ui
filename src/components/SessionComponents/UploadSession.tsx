import { Upload } from "lucide-react";
import { useState } from "react";

export default function UploadSession() {
  const [uploadFormToggle, setUploadFormToggle] = useState<boolean>(false);

  return (
    <section className="flex justify-between items-center gap-4 bg-linear-to-b from-green-700 to-primary-dark p-5 shadow-lg rounded-xl">
      <div className="text-white max-w-9/12 space-y-3">
        <h1 className="text-2xl not-md:text-lg font-bold">
          Uploading Sessions
        </h1>
        <p className="text-lg not-md:text-sm">
          Upload high-quality video sessions to assign individualized care to
          your patients.
        </p>
      </div>
      <button
        onClick={() => setUploadFormToggle(!uploadFormToggle)}
        className="flex items-center justify-center gap-2  bg-white px-4 py-2 rounded-xl shadow-md text-primary font-bold hover:scale-105 cursor-pointer transition-transform"
      >
        <Upload className="size-6" /> Upload Session
      </button>
    </section>
  );
}
