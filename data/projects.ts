import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-03-01",
    owner: "Sarah Chen",
    progress: 65,
  },
  {
    id: "2",
    name: "Mobile App",
    status: "idea",
    startDate: "2024-02-01",
    endDate: "2024-06-15",
    owner: "Mike Rodriguez",
    progress: 0,
  },
  {
    id: "3",
    name: "API Refactor",
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2024-01-10",
    owner: "Alex Kim",
    progress: 100,
  },
  {
    id: "4",
    name: "Database Migration",
    status: "paused",
    startDate: "2024-01-01",
    endDate: "2024-04-30",
    owner: "Jordan Taylor",
    progress: 25,
  },
  {
    id: "5",
    name: "Old CRM Integration",
    status: "cancelled",
    startDate: "2023-09-01",
    endDate: "2023-12-01",
    owner: "Sam Wilson",
    progress: 15,
  },
]
