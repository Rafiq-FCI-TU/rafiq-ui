import type { Activity } from "../../types/HomeCards";

export default function Activity({ img, title, description }: Activity) {
  return (
    <div className="flex flex-col  rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all border border-gray-50">
      <img src={img} className="w-full object-contain rounded-t-2xl" />
      <div className="space-y-2 p-8">
        <h4 className="text-[#2D2D2D] text-2xl font-semibold">{title}</h4>
        <p className="text-[#717182] text-lg">{description}</p>
      </div>
    </div>
  );
}
