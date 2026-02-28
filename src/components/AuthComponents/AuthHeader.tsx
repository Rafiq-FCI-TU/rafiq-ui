interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{title}</h1>
      <p className="text-base text-gray-500 font-medium">{subtitle}</p>
    </div>
  );
}
