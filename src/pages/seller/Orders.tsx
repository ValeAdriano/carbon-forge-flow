import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function SellerOrders() {
  return (
    <div className="container py-8">
      <SEO title="Pedidos Recebidos | Produtor" canonical="/seller/orders" />
      <h1 className="text-2xl font-bold mb-4">Pedidos Recebidos</h1>
      <Card><CardHeader><CardTitle className="text-base">Lista</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Em breve (Novo, Em análise, Concluído).</CardContent></Card>
    </div>
  )
}
