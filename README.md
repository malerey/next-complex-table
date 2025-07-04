# Complex Table Playground

I've built incredibly complex tables for clients in the past, but never had the chance to publish them or plan one myself from scratch and make all the decisions. This is my playground to build the table I've always wanted to create, while also practicing a product mindset - building iteratively based on real usage rather than over-engineering upfront.

Starting simple and adding features as I think of them or get annoyed by limitations.

## Current Status

- [x] Clean Next.js setup with TypeScript
- [x] ESLint + Prettier configured
- [x] TanStack Table setup
- [x] Basic project table with status
- [x] Tailwind CSS styling
- [x] Expandable task details
- [ ] Everything else...

## The Plan (loosely)

Build a project management table that doesn't suck. Will probably get very complex.

### Features I Want to Add Eventually:

- **Nested Data**: Expandable rows with tasks, subtasks, dependencies
- **Advanced Interactions**: Drag-and-drop file uploads, modal inline editing
- **User Customization**: Resizable columns, column visibility, saved table preferences
- **Theming**: User-controlled themes saved to profile
- **Performance**: Virtualization for large datasets, optional pagination
- **Multi-selection**: Batch operations, bulk editing/deleting
- **Offline Support**: Queue updates when offline, sync when back online
- **Conflict Resolution**: Handle simultaneous edits with user alerts
- **Real-time**: Live updates when multiple users are editing

### Testing (Future)

- Unit tests with Vitest
- E2E tests with Playwright (maybe)

## Running

\`\`\`bash
npm install
npm run dev
\`\`\`

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

### Phase 1: "Just Get Projects Visible" ✅

**Started with the absolute minimum:**

- Just project names in a basic table
- Data: `{ id, name }` - that's it!
- Added simple `status` field: idea, active, paused, completed, cancelled
- Added basic color system (gray, blue, yellow, green, red)

Discovery: when tracking projects I need to know who is responsible for it first.

### Phase 2: "We Need More Context" ✅

**Added basic project management context:**

- `startDate`, `endDate` fields because stakeholders will keep asking "when will this be done?"
- `owner` field because "who's responsible for this?"
- `progress` percentage to track completion
- Added progress bars and better date formatting

Discovery: Progress percentages are meaningless without knowing budgets

### Phase 3: "This is Getting Complex" ✅

**Added financial reality and basic task tracking:**

- `budget` object with current and spent amounts
- Over-budget warnings (red text when spent > budget)
- Currency formatting
- `taskCount` and `completedTasks` fields
- Simple "3/8 tasks" display

Discovery: Task counts are useless - I need to see WHAT the actual tasks are!

### Phase 4: "We Need Task Details" ✅

**Added expandable task breakdown:**

- Basic Task interface: `{ id, title, completed }`
- Expandable rows with + / - buttons and tooltips
- Task visualization with checkmarks and circles
- Real task data instead of just counts

Discovery: I need to know who's doing what task and when they're due!
