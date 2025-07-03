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

- Added simple `status` field: active vs completed
- Added basic color coding (green/yellow badges)

**Second discovery:** _"Wait, some projects are just ideas, others are paused... binary isn't enough!"_

- Expanded to 5 status options: idea, active, paused, completed, cancelled
- Better color system (gray, blue, yellow, green, red)
