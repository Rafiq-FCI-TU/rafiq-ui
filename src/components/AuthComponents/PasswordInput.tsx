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
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Field
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 pl-10 bg-green-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
