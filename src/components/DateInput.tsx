import React from 'react';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  outputFormat?: string;
  [key: string]: any;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  label,
  required,
  disabled,
  min = '1920-01-01',
  max = '2030-12-31',
  className = '',
  id,
  placeholder
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 transition disabled:opacity-50"
        />
        <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
      </div>
    </div>
  );
};

export default DateInput;
