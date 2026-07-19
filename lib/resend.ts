import { Resend } from "resend";

// Create a Resend client only when the API key is available.
// This avoids build-time failure if environment variables are not loaded during build.
export function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing RESEND_API_KEY in environment. Add RESEND_API_KEY to your .env.local file.",
    );
  }

  return new Resend(apiKey);
}
