import { Link } from "react-router-dom";
import InputField from "../components/ui/InputField";
import GoogleLogo from "../components/ui/GoogleLogo";
import { useAuth } from "../hooks/useAuth";

/* ── Icon helpers ─────────────────────────────────────────── */
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="3"/>
    <path d="M11 15h7V5H8v6"/>
  </svg>
);

/* ── Component ────────────────────────────────────────────── */
export default function SignIn() {
  const { fields, errors, loading, handleChange, handleSignIn, handleGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col items-center w-full max-w-[412px] mx-auto px-4 pb-12 animate-[fadeSlideUp_0.35s_ease_both]">

      {/* Logo */}
      <div className="mt-[97px] mb-[10px]">
        <div className="w-[80px] h-[80px] bg-[#B8C5B1] rounded-[16px] shadow-[4px_4px_2px_rgba(0,0,0,0.25)] flex items-center justify-center">
          <span className="font-['Poppins'] text-[36px] font-semibold text-white leading-none">
            S
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-['Poppins'] text-[24px] font-medium text-[#8D7C66] mt-[10px] mb-8 tracking-[0.01em]">
        Sign In
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSignIn}
        noValidate
        className="flex flex-col gap-4 w-full max-w-[380px]"
      >
        {/* Email */}
        <div className="animate-[fadeSlideUp_0.4s_ease_0.05s_both]">
          <InputField
            id="email"
            type="email"
            placeholder="Email"
            value={fields.email || ""}
            onChange={handleChange}
            error={errors.email}
            icon={<EmailIcon />}
          />
        </div>

        {/* Password */}
        <div className="animate-[fadeSlideUp_0.4s_ease_0.1s_both]">
          <InputField
            id="password"
            type="password"
            placeholder="Password"
            value={fields.password || ""}
            onChange={handleChange}
            error={errors.password}
            icon={<KeyIcon />}
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-start -mt-1">
          <a
            href="#"
            className="font-['Poppins'] text-[12px] font-normal text-[#06070D] hover:text-[#8D7C66] hover:underline transition-colors duration-200"
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className={[
            "flex items-center justify-center gap-2",
            "w-full h-[50px] rounded-[10px]",
            "bg-[#8D7C66] border border-[#B8C5B1]",
            "shadow-[4px_4px_2px_rgba(0,0,0,0.25)]",
            "font-['Poppins'] text-[24px] font-semibold text-[#F7F8FC]",
            "transition-all duration-200 mt-1",
            "hover:bg-[#7a6b57] hover:shadow-[5px_5px_4px_rgba(0,0,0,0.3)]",
            "active:translate-y-[2px] active:shadow-[2px_2px_1px_rgba(0,0,0,0.2)]",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0",
          ].join(" ")}
        >
          {loading ? (
            <span className="w-5 h-5 border-[2.5px] border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-[#B8C5B1] opacity-60" />
          <span className="font-['Poppins'] text-[12px] text-[#06070D]">or</span>
          <div className="flex-1 h-px bg-[#B8C5B1] opacity-60" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogle}
          className={[
            "flex items-center gap-[10px]",
            "w-full h-[50px] rounded-[20px] px-5",
            "bg-[#F7F8FC] border border-[#8BA88C]",
            "shadow-[4px_4px_2px_rgba(0,0,0,0.25)]",
            "font-['Poppins'] text-[16px] font-medium text-[#06070D]",
            "transition-all duration-200",
            "hover:bg-[#eef0f7] hover:shadow-[5px_5px_4px_rgba(0,0,0,0.2)]",
            "active:translate-y-[1px]",
          ].join(" ")}
        >
          <GoogleLogo size={24} />
          <span>Continue with Google</span>
        </button>
      </form>

      {/* Switch to Sign Up */}
      <p className="mt-5 font-['Poppins'] text-[12px] text-[#06070D] text-center">
        Need an Account?{" "}
        <Link
          to="/sign-up"
          className="font-medium text-[#8D7C66] hover:opacity-75 hover:underline transition-opacity duration-200"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
