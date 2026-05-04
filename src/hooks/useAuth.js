import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

/**
 * useAuth
 * Handles form state, validation, and Firebase auth calls
 * for SignIn and SignUp pages.
 */
export function useAuth() {
  const navigate = useNavigate();
  const [fields,  setFields]  = useState({});
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  /* ── Sign In ────────────────────────────────────────────── */
  async function handleSignIn(event) {
    event.preventDefault();
    const validation = validateSignIn(fields);
    if (Object.keys(validation).length) { setErrors(validation); return; }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, fields.email.trim(), fields.password);
      navigate("/app/home");
    } catch (err) {
      setErrors({ password: friendlyError(err.code) });
    } finally {
      setLoading(false);
    }
  }

  /* ── Sign Up ────────────────────────────────────────────── */
  async function handleSignUp(event) {
    event.preventDefault();
    const validation = validateSignUp(fields);
    if (Object.keys(validation).length) { setErrors(validation); return; }

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        fields.email.trim(),
        fields.password
      );
      // Set the display name from the username field
      await updateProfile(credential.user, { displayName: fields.username.trim() });
      navigate("/app/home");
    } catch (err) {
      setErrors({ email: friendlyError(err.code) });
    } finally {
      setLoading(false);
    }
  }

  /* ── Google OAuth ───────────────────────────────────────── */
  async function handleGoogle() {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/app/home");
    } catch (err) {
      // User closed popup — not an error worth showing
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setErrors({ email: friendlyError(err.code) });
      }
    } finally {
      setLoading(false);
    }
  }

  return { fields, errors, loading, handleChange, handleSignIn, handleSignUp, handleGoogle };
}

/* ── Validators ─────────────────────────────────────────────── */
function validateSignIn({ email, password }) {
  const errs = {};
  if (!email)                   errs.email    = "Email is required.";
  else if (!isValidEmail(email)) errs.email   = "Enter a valid email address.";
  if (!password)                errs.password = "Password is required.";
  return errs;
}

function validateSignUp({ username, email, password }) {
  const errs = {};
  if (!username)                  errs.username = "Username is required.";
  else if (username.length < 3)   errs.username = "At least 3 characters.";
  if (!email)                     errs.email    = "Email is required.";
  else if (!isValidEmail(email))  errs.email    = "Enter a valid email address.";
  if (!password)                  errs.password = "Password is required.";
  else if (password.length < 8)   errs.password = "At least 8 characters.";
  return errs;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/* ── Firebase error → human-readable ────────────────────────── */
function friendlyError(code) {
  const map = {
    "auth/user-not-found":        "No account found with this email.",
    "auth/wrong-password":        "Incorrect password.",
    "auth/invalid-credential":    "Invalid email or password.",
    "auth/email-already-in-use":  "This email is already registered.",
    "auth/weak-password":         "Password must be at least 6 characters.",
    "auth/invalid-email":         "Enter a valid email address.",
    "auth/too-many-requests":     "Too many attempts. Please try again later.",
    "auth/network-request-failed":"Network error. Check your connection.",
  };
  return map[code] ?? "Something went wrong. Please try again.";
}