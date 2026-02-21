// src/auth/todoistAuth.ts

const TODOIST_CLIENT_ID = import.meta.env.VITE_TODOIST_CLIENT_ID;
const TODOIST_REDIRECT_URI = import.meta.env.VITE_TODOIST_REDIRECT_URI;
const TODOIST_SCOPES = "data:read_write";

const TODOIST_AUTH_BASE_URL = "https://todoist.com/oauth/authorize";

function generateState(): string {
  return crypto.randomUUID();
}

export function getTodoistAuthUrl(): string {
  const state = generateState();

  const params = new URLSearchParams({
    client_id: TODOIST_CLIENT_ID,
    scope: TODOIST_SCOPES,
    redirect_uri: TODOIST_REDIRECT_URI,
    state,
  });

  return `${TODOIST_AUTH_BASE_URL}?${params.toString()}`;
}
