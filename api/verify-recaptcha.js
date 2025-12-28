// Vercel Serverless Function: Verify reCAPTCHA v3 token
// Expects JSON body: { token: string }
// Uses env: RECAPTCHA_SECRET_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    res.status(500).json({ ok: false, error: 'Server not configured: missing RECAPTCHA_SECRET_KEY' });
    return;
  }

  try {
    const { token } = req.body || {};
    if (!token || typeof token !== 'string') {
      res.status(400).json({ ok: false, error: 'Missing token' });
      return;
    }

    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();

    // Simple in-memory rate limit per IP (best-effort on warm instances)
    const RATE_LIMIT_MS = 60_000; // 1 minute
    const now = Date.now();
    globalThis.__captchaRateMap = globalThis.__captchaRateMap || new Map();
    const last = globalThis.__captchaRateMap.get(ip) || 0;
    if (ip && last && (now - last) < RATE_LIMIT_MS) {
      res.status(429).json({ ok: false, error: 'Too many requests, please wait.' });
      return;
    }
    globalThis.__captchaRateMap.set(ip, now);

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);
    if (ip) params.append('remoteip', ip);

    const verifyResp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await verifyResp.json();
    // Expected fields: success (boolean), score (0..1), action, hostname
    if (!data.success) {
      res.status(400).json({ ok: false, error: 'Invalid captcha', details: data });
      return;
    }

    // Enforce reasonable score and expected action
    const minScore = 0.5;
    if (typeof data.score === 'number' && data.score < minScore) {
      res.status(400).json({ ok: false, error: 'Low captcha score', details: data });
      return;
    }
    if (data.action && data.action !== 'contact') {
      res.status(400).json({ ok: false, error: 'Unexpected captcha action', details: data });
      return;
    }

    res.status(200).json({ ok: true, score: data.score ?? null });
  } catch (err) {
    console.error('Captcha verification error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}
