import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function OrderSuccess() {
  const { id } = useParams()
  return (
    <div className="container py-16 text-center">
      <SEO title="Pedido concluído | VerdeMarket" description="Seu pedido foi criado com sucesso." canonical={`/orders/${id}/success`} />
      <h1 className="text-3xl font-bold mb-4">Pedido confirmado!</h1>
      <p className="text-muted-foreground mb-6">Número do pedido: <span className="font-medium">{id}</span></p>
      <div className="flex justify-center gap-3">
        <Button asChild><Link to="/buyer/purchases">Minhas compras</Link></Button>
        <Button asChild variant="secondary"><Link to="/marketplace">Voltar ao marketplace</Link></Button>
      </div>
      <Card className="mt-8 p-6 inline-block">Botão de baixar comprovante (PDF simulado) em breve.</Card>
    </div>
  )
}
