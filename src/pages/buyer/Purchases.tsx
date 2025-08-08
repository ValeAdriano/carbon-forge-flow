import { db } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function BuyerPurchases() {
  const orders = db.listOrders()
  return (
    <div className="container py-8">
      <SEO title="Minhas Compras | Comprador" canonical="/buyer/purchases" />
      <h1 className="text-2xl font-bold mb-4">Minhas Compras</h1>
      <div className="space-y-3">
        {orders.map(o => (
          <Card key={o.id}><CardHeader><CardTitle className="text-base">Pedido {o.id}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Status: {o.status} · Total R$ {o.total.toLocaleString()}</CardContent></Card>
        ))}
      </div>
    </div>
  )
}
