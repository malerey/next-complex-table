import type { Project } from '@/types/project'

// Static mock data for production
export const mockProjects: Project[] = [
  {
    id: "proj_001",
    name: "E-commerce Platform Redesign",
    status: "active",
    owner: "Sarah Chen",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: { current: 150000, spent: 89000 },
    tasks: [
      {
        id: "task_001",
        title: "User Research & Analysis",
        status: "completed",
        assignee: "Sarah Chen",
        dueDate: "2024-02-15",
        category: "research",
        weight: 3
      },
      {
        id: "task_002", 
        title: "Wireframe Design",
        status: "completed",
        assignee: "Mike Johnson",
        dueDate: "2024-03-01",
        category: "design",
        weight: 4
      },
      {
        id: "task_003",
        title: "Frontend Implementation",
        status: "in-progress",
        assignee: "Alex Rodriguez",
        dueDate: "2024-05-15",
        category: "development",
        weight: 5
      },
      {
        id: "task_004",
        title: "Backend API Development",
        status: "in-progress", 
        assignee: "Lisa Wang",
        dueDate: "2024-05-01",
        category: "development",
        weight: 5
      }
    ]
  },
  {
    id: "proj_002",
    name: "Mobile App MVP",
    status: "paused",
    owner: "David Kim",
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    budget: { current: 80000, spent: 25000 },
    tasks: [
      {
        id: "task_005",
        title: "Market Research",
        status: "completed",
        assignee: "Emma Davis",
        dueDate: "2024-02-28",
        category: "research",
        weight: 2
      },
      {
        id: "task_006",
        title: "UI/UX Design",
        status: "blocked",
        assignee: "Tom Wilson",
        dueDate: "2024-04-15",
        category: "design", 
        weight: 4
      }
    ]
  },
  {
    id: "proj_003",
    name: "Data Analytics Dashboard",
    status: "completed",
    owner: "Rachel Green",
    startDate: "2023-09-01",
    endDate: "2024-01-31",
    budget: { current: 120000, spent: 115000 },
    tasks: [
      {
        id: "task_007",
        title: "Requirements Gathering",
        status: "completed",
        assignee: "Rachel Green",
        dueDate: "2023-09-30",
        category: "planning",
        weight: 2
      },
      {
        id: "task_008",
        title: "Database Design",
        status: "completed",
        assignee: "James Brown",
        dueDate: "2023-10-31",
        category: "development",
        weight: 3
      },
      {
        id: "task_009",
        title: "Dashboard Implementation", 
        status: "completed",
        assignee: "Anna Lee",
        dueDate: "2023-12-15",
        category: "development",
        weight: 5
      },
      {
        id: "task_010",
        title: "User Training",
        status: "completed",
        assignee: "Rachel Green",
        dueDate: "2024-01-15",
        category: "training",
        weight: 2
      }
    ]
  },
  {
    id: "proj_004",
    name: "Security Audit & Compliance",
    status: "idea", 
    owner: "Michael Johnson",
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    budget: { current: 75000, spent: 0 },
    tasks: [
      {
        id: "task_011",
        title: "Security Assessment Planning",
        status: "todo",
        assignee: "Michael Johnson",
        dueDate: "2024-07-15",
        category: "planning",
        weight: 2
      },
      {
        id: "task_012",
        title: "Vulnerability Scanning",
        status: "todo", 
        assignee: null,
        dueDate: "2024-08-30",
        category: "security",
        weight: 4
      }
    ]
  }
]
