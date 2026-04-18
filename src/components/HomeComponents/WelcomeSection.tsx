import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
// import WelcomeFeature from "./WelcomeFeature";
// import type { Feature } from "../../types/HomeCards";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Care", id: "care" },
  { label: "Activities", id: "activities" },
  // { label: "Get Started", id: "get-started" },
];
// const features: Feature[] = [
//   {
//     img: "family.png",
//     title: "Family-Centered Care",
//     description:
//       "Collaborative tools connecting parents, children, and specialists in one unified platform",
//     bg: "bg-linear-to-b from-blue-600 to-blue-400",
//   },
//   {
//     img: "arrow.png",
//     title: "Evidence-Based Therapy",
//     description:
//       "Research-backed methods for speech, motor skills, and cognitive development",
//     bg: "bg-linear-to-b from-primary-dark to-green-700",
//   },
//   {
//     img: "heart.png",
//     title: "Specialized Support",
//     description:
//       "Resources and programs specifically designed for children with Down syndrome",
//     bg: "bg-linear-to-b from-purple-600 to-purple-400",
//   },
// ];
export default function WelcomeSection() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen relative  bg-linear-to-b from-primary-dark to-primary"
    >
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-primary-dark/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3 text-white font-semibold text-xl lg:text-2xl">
          <div className="bg-white p-2 size-12 lg:size-16 flex items-center justify-center shadow-xl rounded-2xl lg:rounded-3xl">
            <img src="logo.png" alt="Rafiq logo" className="w-5 lg:w-7" />
          </div>
          <span>Rafiq</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`cursor-pointer font-medium text-base transition-all duration-300 relative group ${
                activeSection === item.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-300 ${
                  activeSection === item.id
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/register"
            className="bg-white text-primary-dark font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-white text-primary-dark font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden cursor-pointer text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-primary-dark/98 backdrop-blur-md shadow-xl border-t border-white/10">
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-medium cursor-pointer text-lg py-2 transition-colors ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-white/20 pt-4 mt-2 flex flex-col gap-3">
                <Link
                  to="/register"
                  className="bg-white text-primary-dark font-semibold text-center py-3 rounded-xl hover:scale-102 transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-primary-dark font-semibold text-center py-3 rounded-xl hover:scale-102 transition-all duration-300"
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-24" />

      <section className="flex items-center justify-around gap-10 flex-wrap not-lg:flex-col-reverse   p-20 not-md:px-0 relative">
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
          <span className="absolute not-md:-right-5 -top-8 -right-8 size-16 bg-white rounded-2xl flex items-center justify-center">
            <Heart className="text-primary fill-primary size-10" />
          </span>
          <img
            src="welcome.png"
            alt="welcome"
            className="w-full object-contain"
          />
        </div>
      </section>
      {/* <section className="not-md:w-10/12 mx-auto lg:absolute lg:-bottom-75 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  lg:gap-10 xl:gap-30 p-20 not-md:px-0">
        {features.map((feature, index) => (
          <WelcomeFeature
            key={index}
            title={feature.title}
            description={feature.description}
            img={feature.img}
            bg={feature.bg}
          />
        ))}
      </section> */}
    </section>
  );
}
