import { DndContext} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Column } from "../types/column";
import type { Task } from "../types/task";
import { ColumnComponent } from "./Column";
export type KanbanBoardProps = {
  columns: Column[];
  tasks: Task[];
  onTaskMove?: (taskId: string, newSectionId: string) => void;
};

export function KanbanBoard({ columns, tasks, onTaskMove }: KanbanBoardProps) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id.toString();
    const newSectionId = over.id.toString();
    console.log("Task trascinato:", taskId);
    console.log("Rilasciato su colonna:", newSectionId);
    if (onTaskMove) {
      onTaskMove(taskId, newSectionId);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <ColumnComponent
            key={col.id}
            column={col}
            tasks={tasks.filter((t) => t.sectionId === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
