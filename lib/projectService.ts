import type { Project } from '@/types/project'

class ProjectService {
  private baseUrl = '/api/projects'

  async getAllProjects(): Promise<Project[]> {
    const response = await fetch(this.baseUrl, {
      cache: 'no-store' // Ensure we get fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    
    return response.json()
  }

  async getProject(id: string): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch project')
    }
    
    return response.json()
  }

  async createProject(project: Omit<Project, 'id'> & { id?: string }): Promise<Project> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: project.id || Math.random().toString(36).substr(2, 9),
        ...project
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create project')
    }
    
    return response.json()
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update project')
    }
    
    return response.json()
  }

  async deleteProject(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete project')
    }
  }
}

export const projectService = new ProjectService()
