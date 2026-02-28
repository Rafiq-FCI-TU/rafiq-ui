import { Field } from 'formik';
import type { LucideIcon } from 'lucide-react';

interface TextInputProps {
  label: string;
  placeholder: string;
  error?: string;
  name: string;
  icon: LucideIcon;
  type?: string;
}

export default function TextInput({ 
  label, 
  placeholder, 
  error,
  name,
  icon: Icon,
  type = 'text'
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
        {label}
      </label>
      <div className="relative">
        <Field
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm transition-all shadow-sm"
        />
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      {error && <div className="text-red-500 text-xs mt-1.5 font-medium">{error}</div>}
    </div>
  );
}
