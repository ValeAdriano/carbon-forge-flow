import { SEO } from '@/components/SEO'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <div className="container py-12 max-w-xl">
      <SEO title="Contato | VerdeMarket" canonical="/contact" />
      <h1 className="text-3xl font-bold mb-4">Contato</h1>
      <div className="grid gap-3">
        <Input placeholder="Seu nome" />
        <Input placeholder="Seu e-mail" />
        <Input placeholder="Mensagem" />
        <Button>Enviar</Button>
      </div>
    </div>
  )
}
