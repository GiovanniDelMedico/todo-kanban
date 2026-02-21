import { getTodoistAuthUrl } from "../auth/todoistAuth";

export function ConnectTodoistButton() {
  const handleClick = () => {
    const url = getTodoistAuthUrl();
    window.location.href = url;
  };

  return (
    <button className="bg-blue-400 shadow-lg p-4 text-2xl font-bold rounded-2xl" onClick={handleClick}>
      Collega Todoist
    </button>
  );
}
