import { Link } from "react-router";

export default function WelcomeSection() {
  return (
    <section className="bg-[#E6F6EC] min-h-screen">
      <header className="px-10  py-5 flex items-center gap-4 text-green-700 font-semibold text-5xl">
        <img src="logo.png" alt="Rafiq logo" className="w-11" />
        <span>رفيق</span>
      </header>

      <section className="flex justify-around flex-wrap items-center gap-20 not-lg:flex-col p-20 not-md:px-5 relative">
        <span className="absolute top-1/8 opacity-30 text-5xl left-1/6">
          ⭐
        </span>
        <span className="absolute top-1/8 opacity-30 text-5xl right-1/3">
          🌈
        </span>
        <span className="absolute top-1/2 opacity-30 text-5xl left-1/3">
          ❤️
        </span>
        <img
          src="WelcomePhoto.png"
          alt="welcome"
          className="lg:size-1/3 not-md:w-5/6 md:w-4/6"
        />
        <div className="w-1/3 flex flex-col gap-5 not-lg:w-full">
          <h2 className="text-5xl not-md:text-4xl font-semibold text-[#2C3E50]">
            هيا بنا نبنى عالما لدعم و فهم الاطفال
          </h2>
          <p className="text-xl font-medium text-[#969696]">
            نساعدك على التعرف على متلازمه دون و اكتشاف العاب جديدة بالاضافه الى
            تواصل مع اطباء مختصصين وجلسات تدعم كل طفل لتطوير قدراته والتفاعل مع
            المختمع
          </p>
          <Link
            to="/register"
            className="text-white w-fit font-semibold text-lg bg-[#28D428] py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
          >
            ابدأ الآن
          </Link>
        </div>
      </section>
    </section>
  );
}
