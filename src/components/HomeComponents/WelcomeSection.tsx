import { Heart } from "lucide-react";
import { Link } from "react-router";
import WelcomeFeature from "./WelcomeFeature";
import type { Feature } from "../../types/HomeCards";

export default function WelcomeSection() {
  const features: Feature[] = [
    {
      img: "family.png",
      title: "Family-Centered Care",
      description:
        "Collaborative tools connecting parents, children, and specialists in one unified platform",
      bg: "bg-linear-to-b from-blue-600 to-blue-400",
    },
    {
      img: "arrow.png",
      title: "Evidence-Based Therapy",
      description:
        "Research-backed methods for speech, motor skills, and cognitive development",
      bg: "bg-linear-to-b from-primary-dark to-green-700",
    },
    {
      img: "heart.png",
      title: "Specialized Support",
      description:
        "Resources and programs specifically designed for children with Down syndrome",
      bg: "bg-linear-to-b from-purple-600 to-purple-400",
    },
  ];
  return (
    <section className="relative lg:pb-25 bg-linear-to-b from-primary-dark to-primary">
      <header className="px-10  py-5 flex items-center gap-4 text-white font-semibold text-5xl">
        <div className="bg-white p-2 size-16 flex items-center justify-center shadow-xl rounded-3xl">
          <img src="logo.png" alt="Rafiq logo" className="w-9" />
        </div>
        <span>Rafiq</span>
      </header>

      <section className="flex items-center justify-around gap-10 flex-wrap not-lg:flex-col-reverse   p-20 not-md:px-5 relative">
        <div className="w-10/12 lg:w-2/5 space-y-5 flex flex-col gap-5">
          <h2 className=" not-lg:text-3xl  lg:text-4xl xl:text-5xl  font-semibold text-white">
            Building a world of
            <span className="text-green-600"> understanding </span>and support.
          </h2>
          <p className="text-lg font-light text-gray-300">
            Transform your child's development through personalized therapy,
            interactive games, and comprehensive tracking tools designed for
            every milestone.
          </p>
          <div className="flex gap-4 not-lg:gap-2 flex-wrap">
            <Link
              to="/register"
              className="text-primary-dark text-center w-fit shadow-2xl  font-semibold text-lg not-lg:text-base bg-white py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="https://ndss.org/about"
              target="_blank"
              className="text-white border-2 border-white/30 text-center w-fit font-semibold text-lg not-lg:text-base bg-white/10 py-4 px-8 rounded-xl hover:bg-primary-light transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="w-10/12 h-fit lg:w-1/3 bg-white/10 p-10 border-2 border-white/30 rounded-2xl relative">
          <span className="absolute -top-8 -right-8 size-16 bg-white rounded-2xl flex items-center justify-center">
            <Heart className="text-primary fill-primary size-10" />
          </span>
          <img
            src="welcome.png"
            alt="welcome"
            className="w-full object-contain"
          />
        </div>
      </section>
      <section className="not-md:w-10/12 mx-auto lg:absolute lg:-bottom-75 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  lg:gap-10 xl:gap-30 p-20 not-md:px-0">
        {features.map((feature, index) => (
          <WelcomeFeature
            key={index}
            title={feature.title}
            description={feature.description}
            img={feature.img}
            bg={feature.bg}
          />
        ))}
      </section>
    </section>
  );
}
