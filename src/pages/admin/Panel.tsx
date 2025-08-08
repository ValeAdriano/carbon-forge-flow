import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function AdminPanel() {
  return (
    <div className="container py-8">
      <SEO title="Admin | Painel" canonical="/admin" />
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <div className="grid sm:grid-cols-4 gap-4">
        {['Usuários','Listagens','Pedidos','Pendências'].map((t,i)=>(
          <Card key={i}><CardHeader><CardTitle className="text-base">{t}</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">-</CardContent></Card>
        ))}
      </div>
    </div>
  )
}
