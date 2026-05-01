import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * useAuth
 * Shared auth logic for Sign-In and Sign-Up pages.
 *
 * Returns helpers for field state, validation, and submit handling.
 * Wire the TODO stubs to Firebase / Supabase / your backend when ready.
 */
export function useAuth() {
  const navigate = useNavigate();

  // ── Field state ────────────────────────────────────────────────────────────
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on input
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // ── Validators ─────────────────────────────────────────────────────────────
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function validateSignIn({ email, password }) {
    const errs = {};
    if (!email)                    errs.email    = "Email is required.";
    else if (!isValidEmail(email)) errs.email    = "Enter a valid email address.";
    if (!password)                 errs.password = "Password is required.";
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

  // ── Submit handlers ────────────────────────────────────────────────────────
  async function handleSignIn(e) {
    e.preventDefault();
    const errs = validateSignIn(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // TODO: Replace with real auth call
      // await signInWithEmailAndPassword(auth, fields.email, fields.password);
      await new Promise((r) => setTimeout(r, 1000)); // remove — dev stub
      navigate("/app");
    } catch {
      setErrors({ password: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const errs = validateSignUp(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // TODO: Replace with real auth call
      // await createUserWithEmailAndPassword(auth, fields.email, fields.password);
      await new Promise((r) => setTimeout(r, 1000)); // remove — dev stub
      navigate("/sign-in");
    } catch {
      setErrors({ email: "This email may already be in use." });
    } finally {
      setLoading(false);
    }
  }

  function handleGoogle() {
    // TODO: Replace with real Google OAuth
    // await signInWithPopup(auth, new GoogleAuthProvider());
    console.log("Google auth — wire to provider.");
  }

  return {
    fields,
    errors,
    loading,
    handleChange,
    handleSignIn,
    handleSignUp,
    handleGoogle,
  };
}
