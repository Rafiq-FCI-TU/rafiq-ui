import WelcomeSection from "../components/HomeComponents/WelcomeSection";
import Services from "../components/HomeComponents/Services";
import Features from "../components/HomeComponents/Features";
import GetStarted from "../components/HomeComponents/GetStarted";

export default function Home() {
  return (
    <div>
      <WelcomeSection />
      <Services />
      <Features />
      <section className="container mx-auto px-10 pb-30">
        <GetStarted />
      </section>
  
    </div>
  );
}
