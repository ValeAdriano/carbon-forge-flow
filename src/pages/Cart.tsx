import { db } from '@/data/mock'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, remove, updateQty, subtotal } = useCart()
  const listings = db.listListings()

  return (
    <div className="container py-8">
      <SEO title="Carrinho | VerdeMarket" description="Revise seus itens antes de finalizar a compra." canonical="/cart" />
      <h1 className="text-3xl font-bold mb-4">Carrinho</h1>
      {items.length === 0 ? (
        <Card className="p-6"><p className="text-muted-foreground">Seu carrinho está vazio. <Link className="underline" to="/marketplace">Explorar créditos</Link></p></Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map(it => {
              const l = listings.find(x => x.id === it.listingId)!
              return (
                <Card key={it.listingId}>
                  <CardHeader><CardTitle className="text-base">{l.title}</CardTitle></CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <div className="h-20 w-28 rounded bg-primary/10" />
                    <div className="flex-1 text-sm">
                      <p>{l.locationCity}/{l.locationUF} · {l.certification}</p>
                      <p>R$ {it.pricePerTCO2}/tCO₂</p>
                    </div>
                    <input type="number" min={1} value={it.qty} onChange={e=>updateQty(it.listingId, Math.max(1, Number(e.target.value)))} className="w-24 border rounded px-3 py-2" />
                    <Button variant="secondary" onClick={()=>remove(it.listingId)}>Remover</Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div>
            <Card>
              <CardHeader><CardTitle className="text-base">Resumo</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Subtotal: <span className="font-medium">R$ {subtotal.toLocaleString()}</span></p>
                <p>Taxas (2%): <span className="font-medium">R$ {(subtotal*0.02).toFixed(2)}</span></p>
                <p>Total: <span className="font-semibold">R$ {(subtotal*1.02).toFixed(2)}</span></p>
                <Button asChild className="w-full"><Link to="/checkout">Finalizar compra</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
