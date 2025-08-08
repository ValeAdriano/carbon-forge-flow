import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'
import { useCart } from '@/contexts/CartContext'
import { db } from '@/data/mock'
import { useNavigate } from 'react-router-dom'

const Schema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  document: z.string().min(5, 'Informe CNPJ/CPF'),
  email: z.string().email('E-mail inválido'),
  address: z.string().optional(),
  payment: z.string().min(3, 'Informe um método')
})

type FormData = z.infer<typeof Schema>

export default function Checkout() {
  const form = useForm<FormData>({ resolver: zodResolver(Schema) })
  const { items, subtotal, clear } = useCart()
  const navigate = useNavigate()

  function onSubmit(data: FormData) {
    const orders = db.listOrders()
    const id = `o_${Date.now()}`
    const fees = Math.round(subtotal * 0.02)
    const order = { id, buyerId: 'local_buyer', items: items.map(i => ({ listingId: i.listingId, qtyTCO2: i.qty, pricePerTCO2: i.pricePerTCO2 })), subtotal, fees, total: subtotal + fees, status: 'new' as const, createdAt: new Date().toISOString() }
    db.saveOrders([...orders, order])
    clear()
    navigate(`/orders/${id}/success`)
  }

  return (
    <div className="container py-8">
      <SEO title="Checkout | VerdeMarket" description="Finalize sua compra de créditos de carbono." canonical="/checkout" />
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Dados do comprador</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <Input placeholder="Nome" {...form.register('name')} />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
              <Input placeholder="CNPJ/CPF" {...form.register('document')} />
              {form.formState.errors.document && <p className="text-sm text-destructive">{form.formState.errors.document.message}</p>}
              <Input placeholder="E-mail" {...form.register('email')} />
              {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Endereço (opcional)</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <Input placeholder="Endereço completo" {...form.register('address')} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Pagamento (simulado)</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <Input placeholder="Método (ex.: Cartão)" {...form.register('payment')} />
              {form.formState.errors.payment && <p className="text-sm text-destructive">{form.formState.errors.payment.message}</p>}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader><CardTitle className="text-base">Resumo</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Subtotal: <span className="font-medium">R$ {subtotal.toLocaleString()}</span></p>
              <p>Taxas (2%): <span className="font-medium">R$ {(subtotal*0.02).toFixed(2)}</span></p>
              <p>Total: <span className="font-semibold">R$ {(subtotal*1.02).toFixed(2)}</span></p>
              <Button type="submit" className="w-full">Finalizar compra</Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
