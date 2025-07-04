import type { Task } from "./task"

export interface Project {
  id: string
  name: string
  status: "idea" | "active" | "paused" | "completed" | "cancelled"
  startDate: string
  endDate: string
  owner: string
  budget: {
    current: number
    spent: number
  }
  tasks: Task[]
}
