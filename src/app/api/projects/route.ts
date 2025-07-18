import { NextRequest, NextResponse } from 'next/server'
import { getProjects, createProject } from '@/data/projects'

// GET all projects
export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    const project = await createProject(projectData)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
