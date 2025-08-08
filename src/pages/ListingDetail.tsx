import { useParams } from 'react-router-dom'
import { db } from '@/data/mock'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { SEO } from '@/components/SEO'

export default function ListingDetail() {
  const { id } = useParams()
  const listing = db.listListings().find(l => l.id === id)
  const { add } = useCart()
  const [qty, setQty] = useState(100)

  if (!listing) return <div className="container py-8">Listagem não encontrada.</div>

  const subtotal = qty * listing.pricePerTCO2

  return (
    <div className="container py-8">
      <SEO title={`${listing.title} | VerdeMarket`} description={`Crédito certificado ${listing.certification} em ${listing.locationCity}/${listing.locationUF}.`} canonical={`/marketplace/${listing.id}`} />
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="h-64 rounded-md bg-primary/10" aria-label="Galeria placeholder" />
          <Card>
            <CardHeader><CardTitle className="text-base">Resumo</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
              <p>Localização: {listing.locationCity}/{listing.locationUF}</p>
              <p>Hectares: {listing.hectares}</p>
              <p>tCO₂: {listing.tco2.toLocaleString()}</p>
              <p>Certificação: {listing.certification}</p>
              <p>Ano: {listing.year}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Descrição</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{listing.description}</CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Comprar</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Preço por tCO₂: <span className="text-foreground font-medium">R$ {listing.pricePerTCO2}</span></p>
              <label className="text-sm">Quantidade (tCO₂)</label>
              <input type="number" min={1} value={qty} onChange={e=>setQty(Math.max(1, Number(e.target.value)))} className="w-full border bg-background rounded-md px-3 py-2" />
              <p className="text-sm">Subtotal: <span className="font-semibold">R$ {subtotal.toLocaleString()}</span></p>
              <Button className="w-full" onClick={()=> add(listing.id, qty, listing.pricePerTCO2)}>Adicionar ao carrinho</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Itens semelhantes</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Em breve.</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
