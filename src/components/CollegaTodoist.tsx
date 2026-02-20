import { getTodoistAuthUrl } from "../auth/todoistAuth";

export function ConnectTodoistButton() {
  const handleClick = () => {
    const url = getTodoistAuthUrl();
    window.location.href = url;
  };

  return (
    <button onClick={handleClick}>
      Collega Todoist
    </button>
  );
}
