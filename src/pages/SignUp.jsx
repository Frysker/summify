import { Link } from "react-router-dom";
import InputField from "../components/ui/InputField";
import GoogleLogo from "../components/ui/GoogleLogo";
import { useAuth } from "../hooks/useAuth";
import "../styles/auth.css";

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="3" />
    <path d="M11 15h7V5H8v6" />
  </svg>
);

export default function SignUp() {
  const { fields, errors, loading, handleChange, handleSignUp, handleGoogle } = useAuth();

  return (
    <div className="auth-screen auth-screen--signup">
      <div className="auth-logo-wrap">
        <div className="auth-logo-box">
          <span className="auth-logo-letter">S</span>
        </div>
      </div>

      <h1 className="auth-title auth-title--accent">Sign Up</h1>

      <form onSubmit={handleSignUp} noValidate className="auth-form">
        <InputField id="username" type="text" placeholder="Username" value={fields.username || ""} onChange={handleChange} error={errors.username} icon={<UserIcon />} />
        <InputField id="email" type="email" placeholder="Email" value={fields.email || ""} onChange={handleChange} error={errors.email} icon={<EmailIcon />} />
        <InputField id="password" type="password" placeholder="Password" value={fields.password || ""} onChange={handleChange} error={errors.password} icon={<KeyIcon />} />

        <button type="submit" className="btn-auth-primary" disabled={loading}>
          {loading ? <span className="btn-spinner" /> : "Sign Up"}
        </button>

        <span className="auth-or">or</span>

        <button type="button" className="btn-google" onClick={handleGoogle}>
          <GoogleLogo size={24} />
          <span>Continue with Google</span>
        </button>
      </form>

      <p className="auth-switch">
        Already have an Account? <Link to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
}
