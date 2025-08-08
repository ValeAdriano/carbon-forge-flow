import { db } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'

export default function SellerListings() {
  const listings = db.listListings()
  return (
    <div className="container py-8">
      <SEO title="Minhas Listagens | Produtor" canonical="/seller/listings" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Minhas Listagens</h1>
        <Button asChild><Link to="/seller/new">Nova listagem</Link></Button>
      </div>
      <div className="space-y-3">
        {listings.map(l => (
          <Card key={l.id}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">{l.title}</CardTitle>
              <span className="text-xs uppercase text-muted-foreground">{l.status}</span>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground flex items-center justify-between">
              <p>{l.locationCity}/{l.locationUF} · {l.tco2.toLocaleString()} tCO₂ · R$ {l.pricePerTCO2}/tCO₂</p>
              <div className="flex gap-2">
                <Button variant="secondary">Pausar</Button>
                <Button variant="destructive">Remover</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
