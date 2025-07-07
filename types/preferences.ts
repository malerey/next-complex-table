export interface TablePreferences {
  columnVisibility: Record<string, boolean>
  columnSizing: Record<string, number>
  sorting: Array<{
    id: string
    desc: boolean
  }>
  filters: {
    status: string[]
    assignee: string[]
    overdue: boolean
    category: string[]
  }
}
