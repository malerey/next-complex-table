import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-03-01",
    owner: "Sarah Chen",
    budget: {
      current: 50000,
      spent: 58000,
    },
    tasks: [
      { id: "1-1", title: "Design mockups", completed: true, weight: 3 },
      { id: "1-2", title: "Frontend development", completed: true, weight: 5 },
      { id: "1-3", title: "Backend API integration", completed: false, weight: 8 },
      { id: "1-4", title: "User testing", completed: false, weight: 2 },
      { id: "1-5", title: "Performance optimization", completed: false, weight: 3 },
    ],
  },
  {
    id: "2",
    name: "Mobile App",
    status: "idea",
    startDate: "2024-02-01",
    endDate: "2024-06-15",
    owner: "Mike Rodriguez",
    budget: {
      current: 120000,
      spent: 0,
    },
    tasks: [],
  },
  {
    id: "3",
    name: "API Refactor",
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2024-01-10",
    owner: "Alex Kim",
    budget: {
      current: 25000,
      spent: 23500,
    },
    tasks: [
      { id: "3-1", title: "Audit existing endpoints", completed: true, weight: 2 },
      { id: "3-2", title: "Design new API structure", completed: true, weight: 5 },
      { id: "3-3", title: "Implement new endpoints", completed: true, weight: 8 },
      { id: "3-4", title: "Update documentation", completed: true, weight: 3 },
      { id: "3-5", title: "Migration scripts", completed: true, weight: 4 },
      { id: "3-6", title: "Testing and deployment", completed: true, weight: 3 },
    ],
  },
  {
    id: "4",
    name: "Database Migration",
    status: "paused",
    startDate: "2024-01-01",
    endDate: "2024-04-30",
    owner: "Jordan Taylor",
    budget: {
      current: 40000,
      spent: 45000,
    },
    tasks: [
      { id: "4-1", title: "Schema analysis", completed: true, weight: 3 },
      { id: "4-2", title: "Migration plan", completed: true, weight: 2 },
      { id: "4-3", title: "Backup procedures", completed: true, weight: 4 },
      { id: "4-4", title: "Data transformation scripts", completed: false, weight: 8 },
      { id: "4-5", title: "Testing environment setup", completed: false, weight: 5 },
    ],
  },
  {
    id: "5",
    name: "Old CRM Integration",
    status: "cancelled",
    startDate: "2023-09-01",
    endDate: "2023-12-01",
    owner: "Sam Wilson",
    budget: {
      current: 80000,
      spent: 85000,
    },
    tasks: [
      { id: "5-1", title: "Requirements gathering", completed: true, weight: 2 },
      { id: "5-2", title: "API documentation review", completed: false, weight: 3 },
      { id: "5-3", title: "Integration architecture", completed: false, weight: 5 },
    ],
  },
]
