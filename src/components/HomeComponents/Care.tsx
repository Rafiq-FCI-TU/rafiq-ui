import type { Care } from "../../types/HomeCards";
import CareFeature from "./CareFeature";

export default function Care() {
  const careFeature: Care[] = [
    {
      number: 1,
      title: "Personalized Care Plans",
      description:
        "Custom treatment strategies tailored to your child's developmental stage",
    },
    {
      number: 2,
      title: "Assigned Activities",
      description:
        "Receive custom exercises and tasks designed for optimal progress",
    },
    {
      number: 3,
      title: "Parent Dashboard",
      description:
        "Monitor development with detailed reports and milestone tracking",
    },
  ];
  return (
    <section className="flex items-center justify-around gap-10 flex-wrap not-lg:flex-col   p-20 not-md:px-5 relative">
      <div className="relative w-10/12 h-fit lg:w-1/3 bg-white/10  border-2 border-white/30 rounded-2xl">
        <img src="doctor.png" alt="doctor" className="w-full object-contain" />
        <div className="absolute rounded-4xl w-11/12 h-11/12 inset-4 bg-green-300/10 rotate-1" />
      </div>
      <div className="w-10/12 lg:w-2/5 space-y-5 flex flex-col gap-5">
        <h2 className=" not-lg:text-3xl  lg:text-4xl xl:text-5xl  font-bold">
          Professional Guidance & Care
        </h2>
        <p className="text-lg text-gray-600">
          Connect with certified specialists who understand your child's unique
          needs
        </p>
        <div className="container mx-auto space-y-4 ">
          {careFeature.map((feature) => (
            <CareFeature key={feature.number} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
