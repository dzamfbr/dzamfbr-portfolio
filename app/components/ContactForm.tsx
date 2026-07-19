"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  ContactFormData,
  ContactFormErrors,
  validateContactForm,
} from "../../lib/contact";

const initialValues: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type StatusType = "idle" | "success" | "error";

export default function ContactForm() {
  // Tracks the current input values for the contact form.
  const [values, setValues] = useState<ContactFormData>(initialValues);
  const [errors, setErrors] = useState<Partial<ContactFormErrors>>({});
  const [status, setStatus] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof ContactFormData,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    // Validate the form before submitting to the server.

    const validationErrors = validateContactForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your message.");
      }

      // Show a success notification and clear the form fields.
      setStatus("success");
      setStatusMessage(
        "Thank you! Your message has been sent successfully. I'll get back to you as soon as possible.",
      );
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="form-label" htmlFor="contact-name">
          Full Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="form-input"
          value={values.name}
          placeholder="Your full name"
          onChange={(event) => handleInputChange("name", event)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          required
        />
        {errors.name ? (
          <p id="contact-name-error" className="form-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="contact-email">
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="form-input"
          value={values.email}
          placeholder="your@email.com"
          onChange={(event) => handleInputChange("email", event)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          required
        />
        {errors.email ? (
          <p id="contact-email-error" className="form-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className="form-input"
          value={values.subject}
          placeholder="Let's work together"
          onChange={(event) => handleInputChange("subject", event)}
          aria-invalid={!!errors.subject}
          aria-describedby={
            errors.subject ? "contact-subject-error" : undefined
          }
          required
        />
        {errors.subject ? (
          <p id="contact-subject-error" className="form-error">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-textarea"
          rows={6}
          value={values.message}
          placeholder="Tell me about your project..."
          onChange={(event) => handleInputChange("message", event)}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          required
        />
        {errors.message ? (
          <p id="contact-message-error" className="form-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status !== "idle" ? (
        <div
          className={`form-status form-status--${status}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </div>
      ) : null}

      <button type="submit" className="form-submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
