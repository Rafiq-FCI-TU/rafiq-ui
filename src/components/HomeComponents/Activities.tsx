import type { Activity } from "../../types/HomeCards";
import Feature from "./Activity";

export default function Activities() {
  const activities: Activity[] = [
    {
      img: "brain.png",
      title: "Cognitive Games",
      description: "Problem-solving and memory activities",
    },
    {
      img: "cards.png",
      title: "Motor Skills",
      description: "Physical coordination exercises",
    },
    {
      img: "online-training.png",
      title: "Speech Therapy",
      description: "Language and communication skills",
    },
    {
      img: "offline-training.png",
      title: "Social Skills",
      description: "Interaction and communication practice",
    },
  ];
  return (
    <section className=" px-10 py-30 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-20 flex flex-col gap-5">
          <h1 className="text-2xl w-fit bg-green-100 px-8 py-2 rounded-full mx-auto not-lg:text-xl font-semibold text-primary-dark">
            Activities
          </h1>
          <h2 className="text-6xl not-lg:text-4xl font-semibold">
            Learn Through Play
          </h2>
          <p className="text-xl not-lg:text-lg text-gray-600">
            Engaging activities designed to make therapy effective and enjoyable
          </p>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {activities.map((activity, index) => (
            <Feature
              key={index}
              img={activity.img}
              title={activity.title}
              description={activity.description}
            />
          ))}
        </section>
      </div>
    </section>
  );
}
