import { ArrowLeft } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export default function AuthHeader({ title, subtitle, onBack }: AuthHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl lg:text-[40px] font-bold text-gray-900 tracking-tight">{title}</h1>
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-900 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
      </div>
      <p className="text-sm font-medium text-gray-500">{subtitle}</p>
    </div>
  );
}
