import React, { useState, useEffect } from "react";
import { 
  useController, 
  Control, 
  FieldValues, 
  Path,
  RegisterOptions,
  PathValue
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'> {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  placeholder?: string;
  type?: string;
  defaultValue?: PathValue<T, Path<T>>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input<T extends FieldValues>({ 
  name,
  control,
  rules,
  placeholder,
  type = "text",
  defaultValue,
  onChange,
  ...props 
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue as PathValue<T, Path<T>>
  });

  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    onChange?.(e);
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      field.onChange(defaultValue);
    }
  }, [defaultValue, field]);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          {...field}
          placeholder={placeholder}
          type={inputType}
          onChange={handleChange}
          className={`block w-full px-3 py-4 text-sm border rounded-md shadow-sm outline-none 
            ${error ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-600'}
            ${isPasswordType ? 'pr-12' : ''}`}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
      {error && (
        <span className="text-sm text-red-500 mt-1">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Input;
