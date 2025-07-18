import { PrismaClient } from '@prisma/client'
// Import the static projects data - we'll create this file with all projects
import { seedProjects } from './seed-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Clear existing data
  await prisma.task.deleteMany()
  await prisma.project.deleteMany()
  
  // Insert projects and tasks
  for (const project of seedProjects) {
    await prisma.project.create({
      data: {
        id: project.id,
        name: project.name,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        owner: project.owner,
        budgetCurrent: project.budget.current,
        budgetSpent: project.budget.spent,
        tasks: {
          create: project.tasks.map(task => ({
            id: task.id,
            title: task.title,
            status: task.status,
            assignee: task.assignee,
            dueDate: task.dueDate,
            weight: task.weight,
            category: task.category,
          }))
        }
      }
    })
  }
  
  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
