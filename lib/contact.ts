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
  const submittedAt = new Date().toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827; line-height: 1.6;">
      <div style="border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="padding: 24px 28px; background: linear-gradient(90deg, #111827 0%, #1f2937 100%); color: #ffffff;">
          <h2 style="margin: 0 0 8px; font-size: 22px;">New Portfolio Inquiry</h2>
          <p style="margin: 0; font-size: 14px; color: #d1d5db;">A new message has been submitted through your portfolio website.</p>
        </div>

        <div style="padding: 28px;">
          <h3 style="margin: 0 0 16px; font-size: 16px; color: #111827;">Contact Information</h3>

          <div style="display: grid; gap: 12px; margin-bottom: 20px;">
            <div>
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Name</div>
              <div style="font-size: 15px; color: #111827;">${escapeHtml(values.name)}</div>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Email</div>
              <div style="font-size: 15px; color: #111827;">${escapeHtml(values.email)}</div>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Subject</div>
              <div style="font-size: 15px; color: #111827;">${escapeHtml(values.subject)}</div>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Submitted At</div>
              <div style="font-size: 15px; color: #111827;">${escapeHtml(submittedAt)} WIB</div>
            </div>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px; font-size: 16px; color: #111827;">Message</h3>
            <div style="white-space: pre-wrap; padding: 16px; border-radius: 12px; background: #f9fafb; color: #111827; border: 1px solid #e5e7eb;">
              ${escapeHtml(values.message)}
            </div>
          </div>

          <p style="margin: 0 0 8px; font-size: 14px; color: #4b5563;">Reply directly to this email to respond to ${escapeHtml(values.name)}.</p>
          <p style="margin: 0; font-size: 14px; color: #4b5563;">
            Portfolio<br />
            <a href="https://dzamfbr-portfolio.vercel.app" style="color: #2563eb; text-decoration: none;">https://dzamfbr-portfolio.vercel.app</a>
          </p>
        </div>
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
      <p><strong>Dimas Azzam</strong><br />Frontend Developer<br /><a href="https://dzamfbr-portfolio.vercel.app" style="color: #2563eb; text-decoration: none;">https://dzamfbr-portfolio.vercel.app</a></p>
    </div>
  `;
}
