# Complex Table Playground

## The Plan (loosely)

Build a project management table that doesn't suck. Will probably get very complex.

## The Why

I've built incredibly complex tables for clients in the past, but never had the chance to publish them or plan one myself from scratch and make all the decisions. This is my playground to build the table I've always wanted to create, while also practicing a product mindset - building iteratively based on real usage rather than over-engineering upfront, and imagining the real needs of real users that need a Project Management solution.

## Current Status

- [x] Clean Next.js setup with TypeScript
- [x] ESLint + Prettier configured
- [x] TanStack Table setup
- [x] Basic project table with status
- [x] Tailwind CSS basic styling
- [ ] Everything else...

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

```bash
npm install
npm run dev
```

## Development Journey

### Phase 1: "Just Get Projects Visible" ✅

**Started with the absolute minimum:**

- Just project names in a basic table
- Data: `{ id, name }` - that's it!
- No styling, just functional rows

**First discovery:** _"I can't tell which projects are important - they all look the same!"_

- Added simple `status` field: idea, active, paused, completed, cancelled
- Added basic color system (gray, blue, yellow, green, red)

### Phase 2: "We Need More Context" ✅

**After using status for a while, got frustrated:**
_"I can see the status, but I have no idea WHEN these projects are due or WHO is responsible!"_

**Added basic project management context:**

- `startDate`, `endDate` fields because stakeholders kept asking "when will this be done?"
- `owner` field because "who's responsible for this?"
- `progress` percentage to track completion
- Added progress bars and better date formatting
- Discovery: "Progress percentages are meaningless without knowing budgets!"
