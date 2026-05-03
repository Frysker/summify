import { useNavigate } from "react-router-dom";
import MobileShell, { ArrowRightIcon, ProfileIcon } from "../components/layout/MobileShell";
import ToggleSwitch from "../components/ui/ToggleSwitch";
import { useTheme } from "../context/ThemeContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, dyslexicFont, setDyslexicFont } = useTheme();

  return (
    <MobileShell>
      <div className="profile-page">
        <h1 className="screen-title">Profile</h1>

        <section className="profile-hero" aria-label="Account summary">
          <div className="profile-avatar">
            <ProfileIcon />
            <button type="button" className="profile-camera" aria-label="Change profile picture">
              <CameraIcon />
            </button>
          </div>
          <h2>Username</h2>
          <p>User Email</p>
        </section>

        <section className="profile-section" aria-labelledby="account-title">
          <h2 id="account-title">Account</h2>
          <button type="button" className="profile-row" onClick={() => navigate("/app/profile")}>
            <span className="profile-row__icon"><ProfileIcon /></span>
            <span>Edit Details</span>
            <ArrowRightIcon />
          </button>
          <button type="button" className="profile-row profile-row--danger" onClick={() => navigate("/sign-in")}>
            <span className="profile-row__icon"><LogoutIcon /></span>
            <span>Logout</span>
          </button>
        </section>

        <section className="profile-section" aria-labelledby="accessibility-title">
          <h2 id="accessibility-title">Accessibility</h2>
          <div className="profile-toggle-row">
            <span className="profile-badge profile-badge--dark"><MoonIcon /></span>
            <span>Dark Mode</span>
            <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="profile-toggle-row">
            <span className="profile-badge"><TextIcon /></span>
            <span>Dyslexic Font Mode</span>
            <ToggleSwitch checked={dyslexicFont} onChange={setDyslexicFont} />
          </div>
        </section>
      </div>
    </MobileShell>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8h1.5L11 6h2l1.5 2H16a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3Z" />
      <circle cx="12" cy="13.5" r="3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5M21 12H9" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A8 8 0 1 1 11.2 3 6.4 6.4 0 0 0 21 12.8Z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 6h10M7 10h10M7 14h7M7 18h5" />
    </svg>
  );
}
