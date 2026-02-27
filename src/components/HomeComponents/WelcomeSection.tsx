import { Link } from "react-router";

export default function WelcomeSection() {
  return (
    <section className="bg-[#E6F6EC] min-h-screen">
      <header className="px-10  py-5 flex items-center gap-4 text-green-700 font-semibold text-5xl">
        <img src="logo.png" alt="Rafiq logo" className="w-11" />
        <span>Rafiq</span>
      </header>

      <section className="flex justify-around gap-20 flex-wrap items-center not-lg:flex-col-reverse p-20 not-md:px-5 relative">
        <span className="absolute top-1/8 opacity-30 text-5xl left-1/6">
          ⭐
        </span>
        <span className="absolute top-1/8 opacity-30 text-5xl right-1/3">
          🌈
        </span>
        <span className="absolute top-1/2 opacity-30 text-5xl left-1/3">
          ❤️
        </span>
        <div className="w-1/2 flex flex-col gap-5 not-lg:w-full">
          <h2 className=" not-lg:text-3xl  lg:text-4xl xl:text-5xl  font-semibold text-[#2C3E50]">
            Building World To Understanding Our Children And Support
          </h2>
          <p className="text-lg font-medium text-[#969696]">
            peoples that learn about Down's syndrome, Discover games, doctors,
            and sessions that help every child to improve quickly and community
            to intercate with us
          </p>
          <Link
            to="/register"
            className="text-white w-fit font-semibold text-lg bg-[#28D428] py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
        <img
          src="WelcomePhoto.png"
          alt="welcome"
          className="lg:size-1/3 not-xl:w-5/6"
        />
      </section>
    </section>
  );
}
