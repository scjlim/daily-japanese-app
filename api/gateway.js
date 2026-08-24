export default async function handler(req, res) {
  // 1. Check the password sent from the frontend
  const userPassword = req.headers['x-app-password'];
  const correctPassword = process.env.APP_PASSWORD;
  const targetUrl = process.env.APPS_SCRIPT_URL;

  if (!userPassword || userPassword !== correctPassword) {
    return res.status(401).json({ error: "Unauthorized: Incorrect password." });
  }

  try {
    // 2. Forward GET requests (fetching categories and sentences)
    if (req.method === 'GET') {
      const queryParams = new URLSearchParams(req.query).toString();
      const fetchRes = await fetch(`${targetUrl}?${queryParams}`);
      const data = await fetchRes.json();
      return res.status(200).json(data);
    }

    // 3. Forward POST requests (adding, deleting, translating)
    if (req.method === 'POST') {
      const fetchRes = await fetch(targetUrl, {
        method: 'POST',
        body: JSON.stringify(req.body)
      });
      const data = await fetchRes.json();
      return res.status(200).json(data);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    res.status(500).json({ error: "Server error connecting to backend." });
  }
}
