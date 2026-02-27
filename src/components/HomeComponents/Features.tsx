import Feature from "./Feature";

export default function Features() {
  const FeatureList = [
    {
      icon: "🎯",
      title: "Personalized Assessments",
      description:
        "Comprehensive evaluations across speech, motor, and cognitive domains",
    },
    {
      icon: "🎮",
      title: "Interactive Therapy Games",
      description:
        "Fun, engaging activities designed for children aged 6 months to 18 years",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Real-time dashboards showing development milestones and achievements",
    },
    {
      icon: "🎥",
      title: "Secure Video Therapy",
      description:
        "Connect with specialists through encrypted, HIPAA-compliant sessions",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Multi-User Support",
      description:
        "Different views for families, children, and healthcare specialists",
    },
    {
      icon: "♿",
      title: "Accessible Design",
      description:
        "WCAG 2.1 AA compliant with high contrast and screen reader support",
    },
  ];
  return (
    <section className="container mx-auto px-10 pb-30">
      <div className="text-center mb-10 flex flex-col gap-5">
        <h2 className="text-5xl font-semibold text-[#2C3E50] not-sm:text-4xl">
          Why Choose <span className="text-green-600">Rafiq</span>?
        </h2>
        <p className="text-2xl font-medium text-[#717182] not-sm:text-xl">
          Everything you need for comprehensive care
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {FeatureList.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
