import type { LucideIcon } from 'lucide-react';

interface AccountTypeCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  onClick: () => void;
}

export default function AccountTypeCard({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  description,
  onClick
}: AccountTypeCardProps) {
  return (
    <div
      className="p-4 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm group"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`w-16 h-16 ${iconBgColor} rounded-xl flex items-center justify-center mr-5 shrink-0 shadow-md`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
