import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export function AuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");
    void state;

    if (!code) {
      console.error("Missing code in callback");
      return;
    }

    // TODO: verificare lo state (opzionale per ora)

    // Chiamiamo il backend per scambiare il code con il token
    fetch("/api/todoist/exchange-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.access_token;

        if (!token) {
          console.error("No access token received");
          return;
        }

        // Salviamo il token (temporaneamente)
        localStorage.setItem("todoist_token", token);

        // Reindirizziamo alla board
        navigate("/");
      })
      .catch((err) => {
        console.error("Error exchanging code:", err);
      });
  }, []);

  return <p>Collegamento in corso…</p>;
}
