import { Link } from "react-router-dom";
import InputField from "../components/ui/InputField";
import GoogleLogo from "../components/ui/GoogleLogo";
import { useAuth } from "../hooks/useAuth";
import "../styles/auth.css";

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="3"/><path d="M11 15h7V5H8v6"/>
  </svg>
);

export default function SignIn() {
  const { fields, errors, loading, handleChange, handleSignIn, handleGoogle } = useAuth();

  return (
    <div className="auth-screen">

      <div className="auth-logo-wrap">
        <div className="auth-logo-box">
          <span className="auth-logo-letter">S</span>
        </div>
      </div>

      <h1 className="auth-title">Sign In</h1>

      <form onSubmit={handleSignIn} noValidate className="auth-form">
        <InputField id="email"    type="email"    placeholder="Email"    value={fields.email    || ""} onChange={handleChange} error={errors.email}    icon={<EmailIcon />} />
        <InputField id="password" type="password" placeholder="Password" value={fields.password || ""} onChange={handleChange} error={errors.password} icon={<KeyIcon />} />

        <div className="auth-forgot">
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" className="btn-auth-primary" disabled={loading}>
          {loading ? <span className="btn-spinner" /> : "Sign In"}
        </button>

        <span className="auth-or">or</span>

        <button type="button" className="btn-google" onClick={handleGoogle}>
          <GoogleLogo size={24} />
          <span>Continue with Google</span>
        </button>
      </form>

      <p className="auth-switch">
        Need an Account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}
