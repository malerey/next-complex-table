export interface TablePreferences {
  columnVisibility: Record<string, boolean>
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
