# Environment variables — use placeholders (do NOT commit real secrets)

Copy `.env.example` to `.env` and fill the values below (no quotes needed):

VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=public_xxx

## Optional: Email Verification Template

To send verification codes via email (instead of displaying in form), create a new EmailJS template and set:

VITE_EMAILJS_VERIFICATION_TEMPLATE_ID=verification_template_xxx

Template setup in EmailJS:
- **Template ID:** `verification_template_xxx` (or your chosen ID)
- **Subject:** `Your {{website_name}} Verification Code`
- **Email Body:**
```
Hi {{to_name}},

Your verification code is: {{verification_code}}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

---
Sent from {{website_name}}
```

If not configured, the code displays in the form for testing.

# Optional: Google reCAPTCHA v3 site key
# Enable reCAPTCHA protection in your EmailJS account/settings.
# The frontend will obtain a token and include it with the email payload.
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

Restart the dev server after editing `.env` so Vite picks up the values.

## Server-side environment

Set the following environment variable in your hosting platform (e.g., Vercel project settings):

RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

Notes:
- Do not prefix the secret with `VITE_` — it must remain server-only.
- On Vercel, add it under "Environment Variables" and redeploy.
