import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function SellerProfile() {
  return (
    <div className="container py-8">
      <SEO title="Perfil do Produtor" canonical="/seller/profile" />
      <h1 className="text-2xl font-bold mb-4">Perfil do Produtor</h1>
      <Card><CardHeader><CardTitle className="text-base">Dados cadastrais</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Editar dados. KYC em breve.</CardContent></Card>
    </div>
  )
}
