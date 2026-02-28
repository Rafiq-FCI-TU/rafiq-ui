import { useState } from 'react';
import { Field } from 'formik';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  error?: string;
  name?: string;
}

export default function PasswordInput({
  label,
  placeholder,
  error,
  name = 'password'
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
        {label}
      </label>
      <div className="relative">
        <Field
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm transition-all shadow-sm"
        />
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <div className="text-red-500 text-xs mt-1.5 font-medium">{error}</div>}
    </div>
  );
}
