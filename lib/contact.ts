export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape user input for safe HTML output in email templates.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactForm(
  values: ContactFormData,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

// Build HTML content for the notification email sent to the portfolio owner.
export function getNotificationEmailHtml(values: ContactFormData) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin:0 0 1rem;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(values.subject)}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space: pre-wrap; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.75rem; background: #f8fafc; color: #111;">
        ${escapeHtml(values.message)}
      </div>
    </div>
  `;
}

// Build a simple autoresponder email for the visitor.
export function getAutoReplyEmailHtml(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for contacting me through my portfolio website.</p>
      <p>I have successfully received your message and will review it as soon as possible.</p>
      <p>I'll get back to you as soon as I can.</p>
      <p>Best regards,</p>
      <p><strong>Dimas Azzam</strong><br />Frontend Developer<br /><a href="${process.env.SITE_URL ?? "https://your-domain.com"}" style="color: #2563eb; text-decoration: none;">${process.env.SITE_URL ?? "https://your-domain.com"}</a></p>
    </div>
  `;
}
