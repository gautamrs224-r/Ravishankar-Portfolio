import { useState } from "react";

/**
 * useContactForm
 * ---------------------------------------------------------------------------
 * Encapsulates contact form state, validation, and submit handling.
 * Keeping this logic out of the component keeps ContactSection focused on
 * markup/presentation only.
 *
 * Validation rules:
 *  - name: required, min 2 characters
 *  - email: required, valid email format
 *  - message: required, min 10 characters
 *
 * On successful "submit" this currently simulates an async request.
 * Replace `simulateSubmit` with a real API call (e.g. fetch to your
 * backend's /api/contact endpoint) when the backend is ready.
 */
export default function useContactForm() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const validate = (fieldValues = values) => {
    const newErrors = {};

    if (!fieldValues.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (fieldValues.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fieldValues.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!emailRegex.test(fieldValues.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!fieldValues.message.trim()) {
      newErrors.message = "Please write a message.";
    } else if (fieldValues.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const simulateSubmit = () =>
    new Promise((resolve) => setTimeout(resolve, 1200));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    try {
      setStatus("submitting");
      await simulateSubmit();
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
      // Reset the success message after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return { values, errors, status, handleChange, handleSubmit };
}
