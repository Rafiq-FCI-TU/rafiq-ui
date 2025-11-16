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
      className="p-4 bg-white border-2 border-green-200 rounded-lg cursor-pointer hover:border-green-400 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center ml-4`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
