import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function BuyerProfile() {
  return (
    <div className="container py-8">
      <SEO title="Perfil do Comprador" canonical="/buyer/profile" />
      <h1 className="text-2xl font-bold mb-4">Perfil do Comprador</h1>
      <Card><CardHeader><CardTitle className="text-base">Dados cadastrais</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Editar dados do perfil.</CardContent></Card>
    </div>
  )
}
