import { Users, Stethoscope } from 'lucide-react';
import AccountTypeCard from './AccountTypeCard';

interface AccountTypeSelectorProps {
  onSelectAccountType: (type: 'family' | 'specialist') => void;
}

export default function AccountTypeSelector({ onSelectAccountType }: AccountTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Create Account</h2>
        <p className="text-sm font-medium text-gray-500">Choose your account type to get started</p>
      </div>

      <div className="group">
        <AccountTypeCard
          icon={Users}
          iconBgColor="bg-blue-100/50"
          iconColor="text-blue-200"
          title="Family Account"
          description="For parents and guardians managing care for their child"
          onClick={() => onSelectAccountType('family')}
        />
      </div>

      <div className="group">
        <AccountTypeCard
          icon={Stethoscope}
          iconBgColor="bg-green-100/50"
          iconColor="text-green-200"
          title="Specialist Account"
          description="For healthcare professionals providing therapy and care"
          onClick={() => onSelectAccountType('specialist')}
        />
      </div>
    </div>
  );
}
