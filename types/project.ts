import type { Task } from "./task"

export interface Project {
  id: string
  name: string
  status: "idea" | "active" | "paused" | "completed" | "cancelled"
  startDate: string
  endDate: string
  owner: string
  progress: number // percentage 0-100
  budget: {
    current: number
    spent: number
  }
  tasks: Task[]
}
