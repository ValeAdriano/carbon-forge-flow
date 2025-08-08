import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { db } from '@/data/mock'
import { Listing } from '@/types'
import { SEO } from '@/components/SEO'

const Schema = z.object({
  title: z.string().min(3),
  locationUF: z.string().min(2),
  locationCity: z.string().min(2),
  hectares: z.coerce.number().min(1),
  tco2: z.coerce.number().min(1),
  pricePerTCO2: z.coerce.number().min(1),
  certification: z.enum(['VCS','Gold Standard','Outro']),
  year: z.coerce.number().min(1900),
  description: z.string().min(10),
  accept: z.literal(true, { errorMap: ()=>({ message: 'Aceite os termos' }) })
})

type FormData = z.infer<typeof Schema>

export default function SellerNewListing() {
  const form = useForm<FormData>({ resolver: zodResolver(Schema) })

  function onSubmit(data: FormData) {
    const { accept, ...payload } = data
    const listings = db.listListings()
    const newL: Listing = {
      id: `l_${Date.now()}`,
      createdAt: new Date().toISOString(),
      images: [],
      sellerId: 'local_seller',
      status: 'published',
      title: payload.title,
      locationUF: payload.locationUF,
      locationCity: payload.locationCity,
      hectares: payload.hectares,
      tco2: payload.tco2,
      pricePerTCO2: payload.pricePerTCO2,
      certification: payload.certification,
      year: payload.year,
      description: payload.description,
    }
    db.saveListings([newL, ...listings])
    alert('Listagem publicada!')
  }

  return (
    <div className="container py-8">
      <SEO title="Nova Listagem | Produtor" canonical="/seller/new" />
      <h1 className="text-2xl font-bold mb-4">Nova Listagem</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="text-base">Informações do ativo</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-3">
            <Input placeholder="Título" {...form.register('title')} />
            <>
              <input type="hidden" {...form.register('certification')} />
              <Select onValueChange={(v)=>form.setValue('certification', v as any)}>
                <SelectTrigger><SelectValue placeholder="Certificação" /></SelectTrigger>
                <SelectContent>
                  {['VCS','Gold Standard','Outro'].map(c=> <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </>
            <Input placeholder="UF" {...form.register('locationUF')} />
            <Input placeholder="Cidade" {...form.register('locationCity')} />
            <Input placeholder="Hectares" type="number" {...form.register('hectares')} />
            <Input placeholder="tCO₂ disponíveis" type="number" {...form.register('tco2')} />
            <Input placeholder="Preço por tCO₂ (R$)" type="number" {...form.register('pricePerTCO2')} />
            <Input placeholder="Ano/base de referência" type="number" {...form.register('year')} />
            <div className="md:col-span-2"><Textarea placeholder="Descrição" {...form.register('description')} /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...form.register('accept')} /> Li e aceito os termos</label>
            <Button type="submit" className="md:col-span-2">Publicar</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
