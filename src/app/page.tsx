import { Table } from "@/components/Table"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageToggle } from "@/components/LanguageToggle"
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <main className="p-8 min-h-screen bg-background">
      <div className="flex justify-between items-center mb-8 p-4 bg-card border border-border rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
        <div className="flex items-center gap-6">
          <LanguageToggle />
          <div className="h-6 w-px bg-border"></div>
          <ThemeToggle />
        </div>
      </div>
      <Table />
    </main>
  )
}
