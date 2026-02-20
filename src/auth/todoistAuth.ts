import { TODOIST_CLIENT_ID,TODOIST_SCOPES,TODOIST_REDIRECT_URI } from "../config/todoist";

const TODOIST_AUTH_BASE_URL = "https://todoist.com/oauth/authorize";

function generateState(): string {
  // In produzione andrebbe salvato (es. in cookie/sessione) per prevenire CSRF
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
