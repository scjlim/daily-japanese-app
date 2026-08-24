export default function handler(req, res) {
  const userPassword = req.headers['x-app-password'];
  const correctPassword = process.env.APP_PASSWORD;
  const targetUrl = process.env.APPS_SCRIPT_URL;

  // 1. Verify Password
  if (!userPassword || userPassword !== correctPassword) {
    return res.status(401).json({ error: "Unauthorized: Incorrect password." });
  }

  // 2. Hand over the secret URL securely
  return res.status(200).json({ targetUrl: targetUrl });
}
