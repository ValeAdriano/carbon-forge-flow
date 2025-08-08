import { db } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'

export default function AdminListingsModeration() {
  const listings = db.listListings()
  return (
    <div className="container py-8">
      <SEO title="Admin | Moderação de Listagens" canonical="/admin/listings" />
      <h1 className="text-2xl font-bold mb-4">Moderação de Listagens</h1>
      <div className="space-y-3">
        {listings.map(l => (
          <Card key={l.id}>
            <CardHeader><CardTitle className="text-base">{l.title}</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{l.locationCity}/{l.locationUF} · {l.certification}</span>
              <div className="flex gap-2"><Button variant="secondary">Aprovar</Button><Button variant="destructive">Reprovar</Button></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
