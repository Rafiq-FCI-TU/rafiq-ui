import WelcomeSection from "../components/HomeComponents/WelcomeSection";
import Services from "../components/HomeComponents/Services";
import Activities from "../components/HomeComponents/Activities";
import GetStarted from "../components/HomeComponents/GetStarted";
import Doctor from "../components/HomeComponents/Care";

export default function Home() {
  return (
    <div>
      <WelcomeSection />
      <Services />
      <Doctor />
      <Activities />
      <section className="container mx-auto px-10 py-30">
        <GetStarted />
      </section>
    </div>
  );
}
