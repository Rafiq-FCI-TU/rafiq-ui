import { Field } from 'formik';

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
    <div className="mb-4">
      <label htmlFor={name} className="block text-[13px] font-semibold text-gray-700 mb-1.5 pl-1">
        {label}
      </label>
      <div className="relative">
        <Field
          type="date"
          id={name}
          name={name}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#188147]/50 focus:border-[#188147] text-sm transition-all shadow-sm"
        />
      </div>
      {error && <div className="text-red-500 text-xs mt-1.5 font-medium">{error}</div>}
    </div>
  );
}
