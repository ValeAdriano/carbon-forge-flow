import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function AdminSettings() {
  return (
    <div className="container py-8">
      <SEO title="Admin | Configurações" canonical="/admin/settings" />
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>
      <Card><CardHeader><CardTitle className="text-base">Taxas do marketplace</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Placeholder</CardContent></Card>
    </div>
  )
}
