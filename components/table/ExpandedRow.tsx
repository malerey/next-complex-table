import type { Project } from "@/types/project"
import { formatDate, getTaskStatusStyles, getTaskStatusIcon, isOverdue } from "@/utils/formatters"

interface ExpandedRowProps {
  project: Project
  colSpan: number
}

export function ExpandedRow({ project, colSpan }: ExpandedRowProps) {
  // Group tasks by category
  const tasksByCategory = project.tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = []
    }
    acc[task.category].push(task)
    return acc
  }, {} as Record<string, typeof project.tasks>)

  return (
    <tr>
      <td colSpan={colSpan} className="border border-gray-300 p-0">
        <div className="bg-gray-50 p-4">
          <h4 className="font-medium text-sm mb-3">Tasks by Category:</h4>
          <div className="space-y-4">
            {Object.entries(tasksByCategory).map(([category, tasks]) => (
              <div key={category}>
                <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">{category}</h5>
                <div className="space-y-2 ml-2">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 text-sm p-2 bg-white rounded border">
                      <span
                        className={`text-sm ${
                          task.status === "completed"
                            ? "text-green-600"
                            : task.status === "blocked"
                            ? "text-red-600"
                            : task.status === "in-progress"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {getTaskStatusIcon(task.status)}
                      </span>

                      <div className="flex-1">
                        <span className={task.status === "completed" ? "line-through text-gray-500" : ""}>
                          {task.title}
                        </span>
                      </div>

                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTaskStatusStyles(task.status)}`}>
                        {task.status.replace("-", " ")}
                      </span>

                      <div className="text-xs text-gray-500 min-w-[80px]">{task.assignee || "Unassigned"}</div>

                      {task.dueDate && (
                        <div
                          className={`text-xs min-w-[70px] ${
                            isOverdue(task.dueDate) && task.status !== "completed"
                              ? "text-red-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {formatDate(task.dueDate)}
                        </div>
                      )}

                      <span className="text-xs text-gray-400 min-w-[30px] text-right">({task.weight})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </td>
    </tr>
  )
}
