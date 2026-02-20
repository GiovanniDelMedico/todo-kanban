export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const { code } = await req.json();

  if (!code) {
    return new Response(JSON.stringify({ error: "Missing authorization code" }), {
      status: 400,
    });
  }

  const client_id = process.env.TODOIST_CLIENT_ID;
  const client_secret = process.env.TODOIST_CLIENT_SECRET;
  const redirect_uri = process.env.TODOIST_REDIRECT_URI;

  if (!client_id || !client_secret || !redirect_uri) {
    return new Response(JSON.stringify({ error: "Missing environment variables" }), {
      status: 500,
    });
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
      return new Response(
        JSON.stringify({ error: "Failed to exchange code", details: data }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ access_token: data.access_token }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error", details: error }), {
      status: 500,
    });
  }
}
