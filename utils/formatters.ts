export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export const getStatusStyles = (status: string) => {
  switch (status) {
    case "idea":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    case "active":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
    case "paused":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

export const getTaskStatusStyles = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
    case "blocked":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

export const getTaskStatusIcon = (status: string) => {
  switch (status) {
    case "todo":
      return "○"
    case "in-progress":
      return "◐"
    case "blocked":
      return "⚠"
    case "completed":
      return "✓"
    default:
      return "○"
  }
}

export const isOverdue = (dueDate: string | null) => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

export const calculateProgress = (tasks: Array<{ status: string; weight: number }>) => {
  if (tasks.length === 0) return 0

  const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0)
  const completedWeight = tasks.filter((task) => task.status === "completed").reduce((sum, task) => sum + task.weight, 0)

  return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0
}
