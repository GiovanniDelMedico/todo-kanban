import { useDroppable } from "@dnd-kit/core";
import type { Column } from "../types/column";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

type ColumnProps = {
  column: Column;
  tasks: Task[];
};

export function ColumnComponent({ column, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const style = { backgroundColor: isOver ? "#e0f2fe" : undefined };

  return (
    <div ref={setNodeRef} style={style} className="p-4 rounded-lg bg-gray-100">
      <h2 className="font-bold text-lg mb-3">{column.title}</h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
