import { Field } from 'formik';
import { Mail } from 'lucide-react';

interface EmailInputProps {
  label: string;
  placeholder: string;
  error?: string;
  name?: string;
  showIcon?: boolean;
}

export default function EmailInput({
  label,
  placeholder,
  error,
  name = 'email',
  showIcon = true
}: EmailInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-[13px] font-semibold text-gray-700 mb-1.5 pl-1">
        {label}
      </label>
      <div className="relative">
        <Field
          type="email"
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full px-4 py-3 ${showIcon ? 'pl-11' : ''} bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#188147]/50 focus:border-[#188147] text-sm transition-all shadow-sm`}
        />
        {showIcon && (
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
      </div>
      {error && <div className="text-red-500 text-xs mt-1.5 font-medium">{error}</div>}
    </div>
  );
}
