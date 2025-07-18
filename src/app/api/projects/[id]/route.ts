import { NextRequest, NextResponse } from 'next/server'
import { updateProject, deleteProject } from '@/data/projects'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { tasks: true }
    })
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Transform to match frontend format
    const transformedProject = {
      id: project.id,
      name: project.name,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      owner: project.owner,
      budget: {
        current: project.budgetCurrent,
        spent: project.budgetSpent,
      },
      tasks: project.tasks,
    }

    return NextResponse.json(transformedProject)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectData = await request.json()
    const project = await updateProject(params.id, projectData)
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteProject(params.id)
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
