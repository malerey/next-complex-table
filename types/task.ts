export interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "blocked" | "completed"
  assignee: string | null
  dueDate: string | null
  weight: number
  category: string
}
