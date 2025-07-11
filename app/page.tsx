import { Table } from "@/components/Table"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
  return (
    <main className="p-8 min-h-screen bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Complex Table Playground</h1>
        <ThemeToggle />
      </div>
      <Table />
    </main>
  )
}
