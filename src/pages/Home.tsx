import WelcomeSection from "../components/HomeComponents/WelcomeSection";
import Services from "../components/HomeComponents/Services";
import Activities from "../components/HomeComponents/Activities";
// import GetStarted from "../components/HomeComponents/GetStarted";
import Doctor from "../components/HomeComponents/Care";

export default function Home() {
  return (
    <div>
      <WelcomeSection />
      <Services />
      <Doctor />
      <Activities />
      {/* <section id="get-started" className="container mx-auto px-6 py-50 min-h-screen flex justify-center items-center">
        <GetStarted />
      </section> */}
    </div>
  );
}
