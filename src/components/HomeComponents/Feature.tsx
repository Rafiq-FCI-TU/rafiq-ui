export default function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center flex items-center gap-3 px-5 py-10 not-md:flex-col  rounded-2xl  shadow-lg hover:scale-102 transition-all border border-gray-50">
      <div className="text-3xl not-md:text-5xl">{icon}</div>
      <div className="flex flex-col gap-2">
        <h4 className="text-[#2D2D2D] text-2xl font-semibold">{title}</h4>
        <p className="text-[#717182] text-lg">{description}</p>
      </div>
    </div>
  );
}
