# Complex Table Playground

I've built incredibly complex tables for clients in the past, but never had the chance to publish them or plan one myself from scratch and make all the decisions. This is my playground to build the table I've always wanted to create, while also practicing a product mindset - building iteratively based on real usage rather than over-engineering upfront.

Starting simple and adding features as I think of them or get annoyed by limitations.

## Features

- 📊 **Advanced Data Table** with sorting, filtering, and pagination
- 🔍 **Multi-level Filtering** (status, owner, date ranges, budget)
- 📱 **Responsive Design** that works on all screen sizes
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui components
- 📋 **Project Management** with tasks, budgets, and status tracking
- 💾 **Database Integration** with SQLite and Prisma ORM
- ✏️ **Live Editing** - modify projects directly in the UI
- 🔄 **Real-time Updates** with automatic table refresh
- 🌓 **Dark/Light Theme** with system preference detection
- 🌍 **Multi-language Support** (EN/ES) with next-intl

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Table**: TanStack React Table v8
- **Database**: SQLite with Prisma ORM
- **API**: Next.js API Routes with full CRUD operations
- **State Management**: React hooks and local state
- **Internationalization**: next-intl

## Database Schema

The application uses SQLite with the following models:

### Project

- `id` - Unique identifier
- `name` - Project name
- `status` - Project status (idea, active, paused, completed, cancelled)
- `startDate` / `endDate` - Project timeline
- `owner` - Project owner
- `budgetCurrent` / `budgetSpent` - Budget tracking
- `tasks` - Related tasks (one-to-many)

### Task

- `id` - Unique identifier
- `title` - Task title
- `status` - Task status (todo, in-progress, blocked, completed)
- `assignee` - Task assignee
- `dueDate` - Task due date
- `weight` - Task priority weight
- `category` - Task category
- `projectId` - Foreign key to project

## API Endpoints

- `GET /api/projects` - Fetch all projects with tasks
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd complex-data-table
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run seed
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database and reseed
npx prisma migrate reset

# Generate new migration after schema changes
npx prisma migrate dev --name migration-name
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/projects/          # API routes for CRUD operations
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── Table.tsx             # Main data table component
│   │   ├── TableColumns.tsx      # Column definitions
│   │   ├── TableFilters.tsx      # Filter components
│   │   └── ProjectEditor.tsx     # Project editing modal
│   ├── data/
│   │   └── projects.ts           # Database service functions
│   ├── lib/
│   │   ├── prisma.ts            # Prisma client instance
│   │   └── utils.ts             # Utility functions
│   ├── types/
│   │   └── project.ts           # TypeScript interfaces
│   └── utils/
│       └── filters.ts           # Filtering logic
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Database seeding script
│   └── seed-data.ts            # Sample project data
└── dev.db                      # SQLite database file
```

## Deployment

**Live Demo:** [https://next-complex-table.vercel.app/](https://next-complex-table.vercel.app/)

### CI/CD Pipeline

- **GitHub Actions**: Runs linting and build checks on every push/PR
- **Vercel**: Auto-deploys to production on main branch pushes
- **Preview Deployments**: Every PR gets its own preview URL

### Development Workflow

1. Make changes locally
2. Push to main branch
3. GitHub Actions validates code (lint, build)
4. Vercel automatically deploys to production
5. Live site updates in ~2 minutes

## Development Journey

- ✅ **Phase 1**: Basic Next.js setup with TypeScript and Tailwind CSS
- ✅ **Phase 2**: Implemented TanStack React Table with sorting and pagination
- ✅ **Phase 3**: Added comprehensive filtering system (status, owner, dates, budget)
- ✅ **Phase 4**: Enhanced UI with shadcn/ui components and responsive design
- ✅ **Phase 5**: Integrated task management with nested data display
- ✅ **Phase 6**: Added dark/light theme system with persistence
- ✅ **Phase 7**: Implemented multi-language support (EN/ES) with next-intl
- ✅ **Phase 8**: Added SQLite database with Prisma ORM for data persistence
- ✅ **Phase 9**: Implemented full CRUD API with Next.js API routes
- ✅ **Phase 10**: Built live editing interface with modal forms and real-time updates
