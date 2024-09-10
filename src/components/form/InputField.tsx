import { VscErrorSmall } from "react-icons/vsc";
interface InputFieldProps {
  label: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  upperCase?: boolean;
  inputAttr: React.InputHTMLAttributes<HTMLInputElement>;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  class?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
}

export const InputField = ({
  label,
  errorMessage,
  handleChange,
  error,
  upperCase,
  inputAttr,
  handleBlur,
  class: customClass,
  icon,
  iconPosition,
  children,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={inputAttr.name} className="text-gray-700 flex text-lg">
        {label}
        {error && (
          <span className="ml-2 text-red-500 flex items-center text-sm">
            <VscErrorSmall className="text-xl" />
            {errorMessage}
          </span>
        )}
      </label>
      <div
        className={`relative flex items-center ${iconPosition == "right" && "justify-end"}`}
      >
        {icon && (
          <span
            className={`select-none absolute mt-1 ${iconPosition == "left" ? "ml-3" : "mr-3"}`}
          >
            {icon}
          </span>
        )}
        <input
          id={inputAttr.name}
          onChange={handleChange}
          className={`${upperCase && "uppercase"}  w-full p-2 border border-gray-300 rounded mt-1 ${customClass} ${iconPosition == "left" && icon && "pl-6"}`}
          {...inputAttr}
          onBlur={handleBlur}
        />
      </div>
      {children}
    </div>
  );
};
