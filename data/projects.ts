import type { Project } from "@/types/project"
import { prisma } from "@/lib/prisma"

export async function getProjects(): Promise<Project[]> {
  const dbProjects = await prisma.project.findMany({
    include: {
      tasks: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  // Transform database format to your interface format
  return dbProjects.map(project => ({
    id: project.id,
    name: project.name,
    status: project.status as Project['status'],
    startDate: project.startDate,
    endDate: project.endDate,
    owner: project.owner,
    budget: {
      current: project.budgetCurrent,
      spent: project.budgetSpent
    },
    tasks: project.tasks.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status as any,
      assignee: task.assignee,
      dueDate: task.dueDate,
      weight: task.weight,
      category: task.category
    }))
  }))
}

export async function getProjectById(id: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: true
    }
  })

  if (!project) return null

  return {
    id: project.id,
    name: project.name,
    status: project.status as Project['status'],
    startDate: project.startDate,
    endDate: project.endDate,
    owner: project.owner,
    budget: {
      current: project.budgetCurrent,
      spent: project.budgetSpent
    },
    tasks: project.tasks.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status as any,
      assignee: task.assignee,
      dueDate: task.dueDate,
      weight: task.weight,
      category: task.category
    }))
  }
}

export async function createProject(project: Omit<Project, 'tasks'> & { tasks?: Project['tasks'] }): Promise<Project> {
  const { tasks = [], ...projectData } = project
  
  const dbProject = await prisma.project.create({
    data: {
      id: projectData.id,
      name: projectData.name,
      status: projectData.status,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      owner: projectData.owner,
      budgetCurrent: projectData.budget.current,
      budgetSpent: projectData.budget.spent,
      tasks: {
        create: tasks.map(task => ({
          id: task.id,
          title: task.title,
          status: task.status,
          assignee: task.assignee,
          dueDate: task.dueDate,
          weight: task.weight,
          category: task.category
        }))
      }
    },
    include: {
      tasks: true
    }
  })

  return {
    id: dbProject.id,
    name: dbProject.name,
    status: dbProject.status as Project['status'],
    startDate: dbProject.startDate,
    endDate: dbProject.endDate,
    owner: dbProject.owner,
    budget: {
      current: dbProject.budgetCurrent,
      spent: dbProject.budgetSpent
    },
    tasks: dbProject.tasks.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status as any,
      assignee: task.assignee,
      dueDate: task.dueDate,
      weight: task.weight,
      category: task.category
    }))
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const { budget, ...projectUpdates } = updates
  
  const updateData: any = { ...projectUpdates }
  
  if (budget) {
    updateData.budgetCurrent = budget.current
    updateData.budgetSpent = budget.spent
  }

  const dbProject = await prisma.project.update({
    where: { id },
    data: updateData,
    include: {
      tasks: true
    }
  })

  return {
    id: dbProject.id,
    name: dbProject.name,
    status: dbProject.status as Project['status'],
    startDate: dbProject.startDate,
    endDate: dbProject.endDate,
    owner: dbProject.owner,
    budget: {
      current: dbProject.budgetCurrent,
      spent: dbProject.budgetSpent
    },
    tasks: dbProject.tasks.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status as any,
      assignee: task.assignee,
      dueDate: task.dueDate,
      weight: task.weight,
      category: task.category
    }))
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await prisma.project.delete({
      where: { id }
    })
    return true
  } catch {
    return false
  }
}
