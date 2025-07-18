"use client"

import { useState } from "react"
import type { Project } from "@/types/project"

interface ProjectEditorProps {
  project: Project
  onSave: (updatedProject: Partial<Project>) => Promise<void>
  onCancel: () => void
}

export function ProjectEditor({ project, onSave, onCancel }: ProjectEditorProps) {
  const [formData, setFormData] = useState({
    name: project.name,
    status: project.status,
    startDate: project.startDate,
    endDate: project.endDate,
    owner: project.owner,
    budgetCurrent: project.budget.current,
    budgetSpent: project.budget.spent,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSave({
        name: formData.name,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
        owner: formData.owner,
        budget: {
          current: formData.budgetCurrent,
          spent: formData.budgetSpent,
        },
      })
    } catch (error) {
      console.error('Failed to save project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="idea">Idea</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Owner</label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Budget Current</label>
            <input
              type="number"
              value={formData.budgetCurrent}
              onChange={(e) => setFormData({ ...formData, budgetCurrent: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Budget Spent</label>
            <input
              type="number"
              value={formData.budgetSpent}
              onChange={(e) => setFormData({ ...formData, budgetSpent: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
