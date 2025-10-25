export default function Service({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center flex flex-col items-center gap-3 p-10 border border-[#E5E5E5] rounded-xl shadow-md hover:scale-102 shadow-green-200 transition-all">
      <div className=" bg-[#00A63E] p-4 rounded-xl text-white shadow-lg">{icon}</div>
      <h4 className="text-[#2D2D2D] text-3xl font-semibold">{title}</h4>
      <p className="text-[#717182] text-lg">{description}</p>
    </div>
  );
}
