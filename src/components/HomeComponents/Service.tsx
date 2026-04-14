import type { Feature } from "../../types/HomeCards";

export default function Service({ title, description, img, bg }: Feature) {
  return (
    <div className="flex gap-4 hover:scale-105 transition-all duration-300 items-start p-8 shadow-xl rounded-3xl bg-white">
      <img
        src={img}
        alt={title}
        className={`size-16 p-4 rounded-3xl ${bg} shadow-xl`}
      />
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
