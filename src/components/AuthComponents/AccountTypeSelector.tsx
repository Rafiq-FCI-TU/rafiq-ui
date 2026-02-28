import { Users, Stethoscope } from 'lucide-react';
import AccountTypeCard from './AccountTypeCard';

interface AccountTypeSelectorProps {
  onSelectAccountType: (type: 'family' | 'specialist') => void;
}

export default function AccountTypeSelector({ onSelectAccountType }: AccountTypeSelectorProps) {
  return (
    <div className="space-y-5">
      <div className="group">
        <AccountTypeCard
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          title="Family Account"
          description="For parents and guardians responsible for the child's care and development"
          onClick={() => onSelectAccountType('family')}
        />
      </div>

      <div className="group">
        <AccountTypeCard
          icon={Stethoscope}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          title="Specialist Account"
          description="For doctors, therapists, and medical professionals providing specialized care"
          onClick={() => onSelectAccountType('specialist')}
        />
      </div>
    </div>
  );
}
