import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSignIn(event) {
    event.preventDefault();
    const validation = validateSignIn(fields);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      navigate("/app/home");
    } catch {
      setErrors({ password: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    const validation = validateSignUp(fields);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      navigate("/sign-in");
    } catch {
      setErrors({ email: "This email may already be in use." });
    } finally {
      setLoading(false);
    }
  }

  function handleGoogle() {
    navigate("/app/home");
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

function validateSignIn({ email, password }) {
  const errors = {};
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  return errors;
}

function validateSignUp({ username, email, password }) {
  const errors = {};
  if (!username) errors.username = "Username is required.";
  else if (username.length < 3) errors.username = "At least 3 characters.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 8) errors.password = "At least 8 characters.";
  return errors;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
