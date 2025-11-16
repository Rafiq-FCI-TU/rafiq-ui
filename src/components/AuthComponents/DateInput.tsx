import { Field } from 'formik';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  label: string;
  error?: string;
  name: string;
}

export default function DateInput({ 
  label, 
  error,
  name
}: DateInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Field
          type="date"
          id={name}
          name={name}
          className="w-full px-3 py-2 pr-10 bg-green-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
