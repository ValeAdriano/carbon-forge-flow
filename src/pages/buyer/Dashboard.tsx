import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function BuyerDashboard() {
  return (
    <div className="container py-8">
      <SEO title="Área do Comprador | Dashboard" canonical="/buyer" />
      <h1 className="text-2xl font-bold mb-4">Dashboard do Comprador</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {['Pedidos','Créditos adquiridos'].map((t,i)=>(
          <Card key={i}><CardHeader><CardTitle className="text-base">{t}</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">-</CardContent></Card>
        ))}
      </div>
    </div>
  )
}
