import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function SellerDashboard() {
  return (
    <div className="container py-8">
      <SEO title="Área do Produtor | Dashboard" description="Acompanhe suas métricas." canonical="/seller" />
      <h1 className="text-2xl font-bold mb-4">Dashboard do Produtor</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {['Créditos publicados','Vendas','Em aprovação'].map((t,i)=>(
          <Card key={i}><CardHeader><CardTitle className="text-base">{t}</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">-</CardContent></Card>
        ))}
      </div>
    </div>
  )
}
