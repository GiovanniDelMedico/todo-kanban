// src/App.tsx

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { COLUMS } from "./data/columns";
import { TASKS } from "./data/tasks";
import { KanbanBoard } from "./components/KanbanBoard";

import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import "./App.css";

function HomePage() {
  const [tasks, setTasks] = useState(TASKS);

  function handleTaskMove(taskId: string, newSectionId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, sectionId: newSectionId } : task
      )
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-500">
        Todoist Kanban Board
      </h1>

      <KanbanBoard
        columns={COLUMS}
        tasks={tasks}
        onTaskMove={handleTaskMove}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home con la tua Kanban */}
        <Route path="/" element={<HomePage />} />

        {/* Callback OAuth */}
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}
