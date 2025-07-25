import type { Project } from '@/types/project'
import type { Task } from '@/types/task'
import {
  formatDate,
  getTaskStatusStyles,
  getTaskStatusIcon,
  isOverdue,
} from '@/utils/formatters'

interface ExpandedRowProps {
  project: Project
  colSpan: number
  onEditTask?: (task: Task, projectId: string) => void
}

export function ExpandedRow({
  project,
  colSpan,
  onEditTask,
}: ExpandedRowProps) {
  // Group tasks by category
  const tasksByCategory = project.tasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = []
      }
      acc[task.category].push(task)
      return acc
    },
    {} as Record<string, typeof project.tasks>
  )

  return (
    <tr>
      <td colSpan={colSpan} className="border border-border p-0">
        <div className="bg-muted p-4">
          <h4 className="font-medium text-sm mb-3 text-foreground">
            Tasks by Category:
          </h4>
          <div className="space-y-4">
            {Object.entries(tasksByCategory).map(([category, tasks]) => (
              <div key={category}>
                <h5 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  {category}
                </h5>
                <div className="space-y-2 ml-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 text-sm p-2 bg-card rounded border border-border shadow-sm"
                    >
                      <span
                        className={`text-sm ${
                          task.status === 'completed'
                            ? 'text-green-600 dark:text-green-400'
                            : task.status === 'blocked'
                              ? 'text-red-600 dark:text-red-400'
                              : task.status === 'in-progress'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-muted-foreground'
                        }`}
                      >
                        {getTaskStatusIcon(task.status)}
                      </span>

                      <div className="flex-1">
                        <span
                          className={
                            task.status === 'completed'
                              ? 'line-through text-muted-foreground'
                              : 'text-card-foreground'
                          }
                        >
                          {task.title}
                        </span>
                      </div>

                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getTaskStatusStyles(task.status)}`}
                      >
                        {task.status.replace('-', ' ')}
                      </span>

                      <div className="text-xs text-muted-foreground min-w-[80px]">
                        {task.assignee || 'Unassigned'}
                      </div>

                      {task.dueDate && (
                        <div
                          className={`text-xs min-w-[70px] ${
                            isOverdue(task.dueDate) &&
                            task.status !== 'completed'
                              ? 'text-destructive font-medium'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {formatDate(task.dueDate)}
                        </div>
                      )}

                      <span className="text-xs text-muted-foreground/60 min-w-[30px] text-right">
                        ({task.weight})
                      </span>

                      {onEditTask && (
                        <button
                          onClick={() => onEditTask(task, project.id)}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ml-2"
                          title="Edit task"
                        >
                          Edit
                        </button>
                      )}
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
