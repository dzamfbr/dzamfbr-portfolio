import { NextResponse } from "next/server";
import { createResendClient } from "../../../lib/resend";
import {
  ContactFormData,
  getAutoReplyEmailHtml,
  getNotificationEmailHtml,
  validateContactForm,
} from "../../../lib/contact";

// API route that receives contact form submissions and sends emails via Resend.
export async function POST(request: Request) {
  let payload: ContactFormData;

  try {
    payload = (await request.json()) as ContactFormData;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const validationErrors = validateContactForm(payload);
  if (Object.keys(validationErrors).length > 0) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        fields: validationErrors,
      },
      { status: 400 },
    );
  }

  const ownerEmail = process.env.MY_EMAIL;
  if (!ownerEmail) {
    return NextResponse.json(
      { error: "Email destination is not configured." },
      { status: 500 },
    );
  }

  try {
    const resend = createResendClient();

    // Send a notification email to the portfolio owner.
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ownerEmail,
      reply_to: payload.email,
      subject: "New Contact Form Submission",
      html: getNotificationEmailHtml(payload),
      text: `New contact form submission from ${payload.name} (${payload.email})\nSubject: ${payload.subject}\nMessage:\n${payload.message}`,
    });

    // Send an automatic confirmation email back to the visitor.
    await resend.emails.send({
      from: "Dimas Azzam <onboarding@resend.dev>",
      to: payload.email,
      subject: "Thanks for contacting Dimas Azzam",
      html: getAutoReplyEmailHtml(payload.name),
      text: `Hi ${payload.name},\n\nThank you for contacting me through my portfolio website. I have successfully received your message and will review it as soon as possible. I'll get back to you as soon as I can.\n\nBest regards,\n\nDimas Azzam\nFrontend Developer\n${process.env.SITE_URL ?? "https://your-domain.com"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again later." },
      { status: 500 },
    );
  }
}
