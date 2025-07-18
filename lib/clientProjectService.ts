import type { Project } from '@/types/project'
import { mockProjects } from '@/data/mock-projects'

const STORAGE_KEY = 'complex-table-projects'
const isDev = process.env.NODE_ENV === 'development'

// Check if we're running in browser
const isBrowser = typeof window !== 'undefined'

class ProjectService {
  // Get projects from localStorage or fallback to mock data
  private getStoredProjects(): Project[] {
    if (!isBrowser) return mockProjects
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load projects from localStorage:', error)
    }
    
    // Initialize localStorage with mock data if empty
    this.saveProjects(mockProjects)
    return mockProjects
  }

  // Save projects to localStorage
  private saveProjects(projects: Project[]): void {
    if (!isBrowser) return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch (error) {
      console.warn('Failed to save projects to localStorage:', error)
    }
  }

  // Get all projects
  async getAllProjects(): Promise<Project[]> {
    if (isDev) {
      // In development, use existing API service
      const { projectService: prismaService } = await import('./projectService')
      return prismaService.getAllProjects()
    }
    
    // In production, use localStorage
    return this.getStoredProjects()
  }

  // Get project by ID
  async getProjectById(id: string): Promise<Project | null> {
    if (isDev) {
      const { projectService: prismaService } = await import('./projectService')
      return prismaService.getProject(id)
    }
    
    const projects = this.getStoredProjects()
    return projects.find(p => p.id === id) || null
  }

  // Create new project
  async createProject(data: Omit<Project, 'id'>): Promise<Project> {
    const newProject: Project = {
      ...data,
      id: `proj_${Date.now()}`
    }

    if (isDev) {
      const { projectService: prismaService } = await import('./projectService')
      return prismaService.createProject(data)
    }
    
    const projects = this.getStoredProjects()
    projects.push(newProject)
    this.saveProjects(projects)
    return newProject
  }

  // Update project
  async updateProject(id: string, data: Partial<Omit<Project, 'id'>>): Promise<Project | null> {
    if (isDev) {
      const { projectService: prismaService } = await import('./projectService')
      return prismaService.updateProject(id, data)
    }
    
    const projects = this.getStoredProjects()
    const index = projects.findIndex(p => p.id === id)
    
    if (index === -1) return null
    
    projects[index] = { ...projects[index], ...data }
    this.saveProjects(projects)
    return projects[index]
  }

  // Delete project
  async deleteProject(id: string): Promise<boolean> {
    if (isDev) {
      const { projectService: prismaService } = await import('./projectService')
      try {
        await prismaService.deleteProject(id)
        return true
      } catch {
        return false
      }
    }
    
    const projects = this.getStoredProjects()
    const filteredProjects = projects.filter(p => p.id !== id)
    
    if (filteredProjects.length === projects.length) return false
    
    this.saveProjects(filteredProjects)
    return true
  }

  // Reset to original mock data
  resetToMockData(): void {
    if (isBrowser) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}

export const projectService = new ProjectService()
