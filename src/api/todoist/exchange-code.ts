import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  const client_id = process.env.TODOIST_CLIENT_ID;
  const client_secret = process.env.TODOIST_CLIENT_SECRET;
  const redirect_uri = process.env.TODOIST_REDIRECT_URI;

  if (!client_id || !client_secret || !redirect_uri) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  try {
    const response = await fetch("https://todoist.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (!data.access_token) {
      return res.status(400).json({ error: "Failed to exchange code", details: data });
    }

    return res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
}
