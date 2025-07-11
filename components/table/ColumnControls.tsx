"use client"

import { useState } from "react"
import type { Table } from "@tanstack/react-table"
import type { Project } from "@/types/project"

interface ColumnControlsProps {
  table: Table<Project>
}

export function ColumnControls({ table }: ColumnControlsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const resetColumnSizes = () => {
    table.resetColumnSizing()
  }

  const presets = {
    compact: {
      expander: 40,
      name: 80,
      status: 60,
      owner: 60,
      endDate: 80,
      progress: 80,
      tasks: 50,
      budget: 80,
    },
    comfortable: {
      expander: 50,
      name: 200,
      status: 100,
      owner: 150,
      endDate: 120,
      progress: 120,
      tasks: 80,
      budget: 140,
    },
    wide: {
      expander: 60,
      name: 300,
      status: 140,
      owner: 200,
      endDate: 160,
      progress: 180,
      tasks: 120,
      budget: 200,
    }
  }

  const applyPreset = (preset: keyof typeof presets) => {
    table.setColumnSizing(presets[preset])
  }

  return (
    <div className="bg-card p-4 border border-border rounded-lg mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-card-foreground">Column Controls</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </button>
          <button
            onClick={resetColumnSizes}
            className="text-xs px-3 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors"
          >
            Reset Sizes
          </button>
        </div>
      </div>

      {/* Quick Presets - Always Visible */}
      <div className="mb-4 p-3 bg-muted rounded-md">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Quick Presets</h4>
        <div className="flex gap-2">
          <button
            onClick={() => applyPreset('compact')}
            className="text-xs px-3 py-1 bg-card border border-border hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          >
            Compact
          </button>
          <button
            onClick={() => applyPreset('comfortable')}
            className="text-xs px-3 py-1 bg-card border border-border hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          >
            Comfortable
          </button>
          <button
            onClick={() => applyPreset('wide')}
            className="text-xs px-3 py-1 bg-card border border-border hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          >
            Wide
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="mb-4 p-3 bg-primary/5 rounded-md border border-primary/20">
          <h4 className="text-xs font-medium text-card-foreground mb-3">Advanced Controls</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column Visibility */}
            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-2">Column Visibility</h5>
              <div className="grid grid-cols-2 gap-2">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <label key={column.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                        className="mr-2 rounded border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
                      />
                      <span className="text-xs text-card-foreground">{column.columnDef.header?.toString() || column.id}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* Column Widths */}
            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-2">Current Widths</h5>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {table
                  .getAllColumns()
                  .filter((column) => column.getIsVisible())
                  .map((column) => {
                    const minSize = column.columnDef.minSize || 0
                    const currentSize = Math.round(column.getSize())
                    const totalSize = table.getCenterTotalSize()
                    const percentage = Math.round((currentSize / totalSize) * 100)
                    const isAtMin = currentSize <= minSize + 5
                    
                    return (
                      <div key={column.id} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground min-w-[60px]">
                          {column.columnDef.header?.toString() || column.id}:
                        </span>
                        <div className="text-xs font-mono flex items-center gap-1">
                          <span className={isAtMin ? 'text-destructive' : 'text-muted-foreground'}>
                            {percentage}%
                          </span>
                          {isAtMin && (
                            <span className="text-destructive text-xs" title="At minimum width">⚠</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Table width: 100% (responsive). Widths shown as percentages.
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          💡 Drag column borders to resize. Table always uses full width - other columns adjust automatically.
        </p>
      </div>
    </div>
  )
}
