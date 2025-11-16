import { Users, Stethoscope } from 'lucide-react';
import AccountTypeCard from './AccountTypeCard';

interface AccountTypeSelectorProps {
  onSelectAccountType: (type: 'family' | 'specialist') => void;
}

export default function AccountTypeSelector({ onSelectAccountType }: AccountTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <AccountTypeCard
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        title="العائلة"
        description="الاولياء الأمور والمسؤلون عن الطفل"
        onClick={() => onSelectAccountType('family')}
      />

      <AccountTypeCard
        icon={Stethoscope}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        title="حساب خاص"
        description="للاطباء والاخصائيين للمتابعة الطفل"
        onClick={() => onSelectAccountType('specialist')}
      />
    </div>
  );
}
