import type { Care } from "../../types/HomeCards";

export default function CareFeature({ number, title, description }: Care) {
  return (
    <section className="flex gap-4 border-l-5 border-primary-dark bg-linear-to-r from-gray-100 to-white p-5 rounded-lg">
      <div className="bg-primary-dark size-10 p-4 font-semibold  rounded-full flex items-center justify-center text-white">
        {number}
      </div>
      <div className="space-y-2">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-gray-600">{description}</div>
      </div>
    </section>
  );
}
