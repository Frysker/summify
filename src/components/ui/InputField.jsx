import { useState } from "react";

/**
 * InputField
 * Reusable input component matching the SUMMIFY Figma design.
 *
 * Props:
 *  - id         {string}    input id / name
 *  - type       {string}    "text" | "email" | "password"
 *  - placeholder{string}
 *  - value      {string}
 *  - onChange   {function}
 *  - error      {string}    error message — empty string means no error
 *  - icon       {ReactNode} SVG icon shown on the left
 */
export default function InputField({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error = "",
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Input box */}
      <div
        className={[
          "flex items-center h-[50px] rounded-[20px] px-4 gap-[10px]",
          "bg-[#F7F8FC] border",
          "shadow-[4px_4px_2px_rgba(0,0,0,0.25)]",
          "transition-all duration-200",
          error
            ? "border-red-400"
            : "border-[#8BA88C] focus-within:border-[#8D7C66]",
        ].join(" ")}
      >
        {/* Left icon */}
        {icon && (
          <span className="text-[#B8C5B1] flex-shrink-0 flex items-center">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          id={id}
          name={id}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={
            id === "password"
              ? "current-password"
              : id === "confirmPassword"
              ? "new-password"
              : id
          }
          className={[
            "flex-1 bg-transparent border-none outline-none",
            "font-['Poppins'] text-[16px] font-normal",
            "text-[#06070D] placeholder-[#B8C5B1]",
            "caret-[#8D7C66]",
          ].join(" ")}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="flex-shrink-0 text-[#B8C5B1] hover:text-[#8D7C66] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D7C66] rounded"
          >
            {showPassword ? (
              /* Eye open */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              /* Eye closed */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-[11px] font-['Poppins'] pl-4 leading-snug">
          {error}
        </p>
      )}
    </div>
  );
}
