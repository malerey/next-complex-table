import type { Project } from "@/types/project"

interface ExpandedRowProps {
  project: Project
  colSpan: number
}

export function ExpandedRow({ project, colSpan }: ExpandedRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="border border-gray-300 p-0">
        <div className="bg-gray-50 p-4">
          <h4 className="font-medium text-sm mb-2">Tasks:</h4>
          <div className="space-y-1">
            {project.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2 text-sm">
                <span className={task.completed ? "text-green-600" : "text-gray-600"}>
                  {task.completed ? "✓" : "○"}
                </span>
                <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
                <span className="text-xs text-gray-400 ml-auto">({task.weight})</span>
              </div>
            ))}
          </div>
        </div>
      </td>
    </tr>
  )
}
