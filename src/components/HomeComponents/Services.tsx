import {
  Users,
  Award,
  Shield,
  Video,
  CalendarClock,
  PhoneCall,
} from "lucide-react";
import Service from "./Service";
export default function Services() {
  const services = [
    {
      icon: <Users />,
      title: "Family ",
      description:
        "Easy-to-use tools for caregivers, children, and specialists",
    },
    {
      icon: <Award />,
      title: "Evidence-Based",
      description:
        "Research-backed therapy for speech, motor, and cognitive development",
    },
    {
      icon: <Shield />,
      title: "Secure & Private",
      description: "HIPAA and COPPA compliant with data storage",
    },
    {
      icon: <Video />,
      title: "Online session",
      description:
        "Connect with Rafiq which provide remotely via video consultations, with access to all your records during the call.",
    },
    {
      icon: <CalendarClock />,
      title: "Appointment Scheduling",
      description:
        "Book appointments with Rafiq provide in real-time, choose your preferred time, and choose doctor which suitable for your case",
    },
    {
      icon: <PhoneCall />,
      title: "Secure Communication",
      description:
        "Stay in touch with your Rafiq provide via secure messaging, ensuring your data remains private and compliant",
    },
  ];
  return (
    <section className="container mx-auto not-sm:px-10 py-30">
      <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-30">
        {services.map((service, index) => (
          <Service
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </section>
      <section className="flex justify-between not-lg:flex-col-reverse items-center gap-20 p-20 not-lg:p-0 not-lg:gap-15 relative">
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl font-semibold text-green-800">
            Sessions & Games
          </h3>
          <p className="text-2xl font-medium text-green-500">
            Rafiq will help you understand how to better support my daughter and
            improve her skills remotely by online sessions and games which can
            find it easy
          </p>
        </div>
        <img src="Group 9419.png" alt="games" className="lg:w-1/2" />
      </section>
    </section>
  );
}
