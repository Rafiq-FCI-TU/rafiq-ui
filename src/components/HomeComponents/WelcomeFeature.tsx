import type { Feature } from "../../types/HomeCards";

export default function WelcomeFeature({
  title,
  description,
  img,
  bg,
}: Feature) {
  return (
    <div className="cursor-pointer hover:scale-105 transition-all flex gap-3 flex-col p-10 shadow-2xl rounded-3xl bg-white">
      <img
        src={img}
        alt={title}
        className={`size-16 p-4 rounded-3xl ${bg} shadow-xl`}
      />
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  );
}
