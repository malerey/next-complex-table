"use client"

import type { TablePreferences } from "@/types/preferences"

interface FilterControlsProps {
  filters: TablePreferences["filters"]
  onFiltersChange: (filters: Partial<TablePreferences["filters"]>) => void
  availableAssignees: string[]
  availableCategories: string[]
}

export function FilterControls({ filters, onFiltersChange, availableAssignees, availableCategories }: FilterControlsProps) {
  const statusOptions = ["idea", "active", "paused", "completed", "cancelled"]

  const toggleFilter = (filterType: keyof TablePreferences["filters"], value: string) => {
    const currentValues = filters[filterType] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    onFiltersChange({ [filterType]: newValues })
  }

  const FilterButton = ({ isSelected, onClick, children }: { 
    isSelected: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="bg-white p-4 border rounded-lg mb-4">
      <h3 className="text-sm font-medium mb-3">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Project Status</label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <FilterButton
                key={status}
                isSelected={filters.status.includes(status)}
                onClick={() => toggleFilter('status', status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Assignee Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Assignee</label>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {availableAssignees.map((assignee) => (
              <FilterButton
                key={assignee}
                isSelected={filters.assignee.includes(assignee)}
                onClick={() => toggleFilter('assignee', assignee)}
              >
                {assignee}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Task Category</label>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {availableCategories.map((category) => (
              <FilterButton
                key={category}
                isSelected={filters.category.includes(category)}
                onClick={() => toggleFilter('category', category)}
              >
                {category}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Overdue Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Special Filters</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.overdue}
                onChange={(e) => onFiltersChange({ overdue: e.target.checked })}
                className="mr-2"
              />
              <span className="text-xs">Has overdue tasks</span>
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-3 pt-3 border-t">
        <button
          onClick={() =>
            onFiltersChange({
              status: [],
              assignee: [],
              category: [],
              overdue: false,
            })
          }
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Clear all filters
        </button>
      </div>
    </div>
  )
}
