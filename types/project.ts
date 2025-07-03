export interface Project {
  id: string
  name: string
  status: "idea" | "active" | "paused" | "completed" | "cancelled"
}
