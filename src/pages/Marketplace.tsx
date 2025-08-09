import { useEffect, useMemo, useState } from 'react'
import { db } from '@/data/mock'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SEO } from '@/components/SEO'
import { Link } from 'react-router-dom'

const UF_OPTIONS = ['SP','AM','GO','BA','RS','MT','PA','MG','AC','RO','CE','PR']
const CERTS = ['VCS','Gold Standard','Outro'] as const

type Cert = (typeof CERTS)[number] | 'all'

export default function Marketplace() {
  const all = db.listListings()
  const [query, setQuery] = useState('')
  const [uf, setUf] = useState<'all' | string>('all')
  const [cert, setCert] = useState<Cert>('all')
  const [minT, setMinT] = useState('')
  const [maxT, setMaxT] = useState('')
  const [minP, setMinP] = useState('')
  const [maxP, setMaxP] = useState('')
  const [sort, setSort] = useState('relevance')
  const [page, setPage] = useState(1)
  const perPage = 9

  const filtered = useMemo(() => {
    let list = all.filter(l => l.status === 'published')
    if (query) list = list.filter(l => l.title.toLowerCase().includes(query.toLowerCase()))
    if (uf !== 'all') list = list.filter(l => l.locationUF === uf)
    if (cert !== 'all') list = list.filter(l => l.certification === cert)
    const [mnT, mxT] = [Number(minT) || 0, Number(maxT) || Infinity]
    const [mnP, mxP] = [Number(minP) || 0, Number(maxP) || Infinity]
    list = list.filter(l => l.tco2 >= mnT && l.tco2 <= mxT && l.pricePerTCO2 >= mnP && l.pricePerTCO2 <= mxP)
    switch (sort) {
      case 'price': list = [...list].sort((a,b)=> a.pricePerTCO2 - b.pricePerTCO2); break
      case 'tco2': list = [...list].sort((a,b)=> b.tco2 - a.tco2); break
      case 'recent': list = [...list].sort((a,b)=> +new Date(b.createdAt) - +new Date(a.createdAt)); break
      default: break
    }
    return list
  }, [all, query, uf, cert, minT, maxT, minP, maxP, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  useEffect(()=>{ if (page>totalPages) setPage(1) }, [filtered.length])
  const pageItems = filtered.slice((page-1)*perPage, page*perPage)

  return (
    <div className="container py-8">
      <SEO title="Marketplace de Créditos de Carbono | VerdeMarket" description="Explore listagens de créditos com filtros por localização, certificação, tCO₂ e preço." canonical="/marketplace" />
      <h1 className="text-3xl font-bold mb-4">Marketplace</h1>

      <div className="grid gap-3 md:grid-cols-6 mb-6">
        <div className="md:col-span-2"><Input placeholder="Busca" value={query} onChange={e=>setQuery(e.target.value)} aria-label="Busca por título" /></div>
        <Select value={uf} onValueChange={setUf}>
          <SelectTrigger aria-label="Filtro por UF"><SelectValue placeholder="UF" /></SelectTrigger>
          <SelectContent className="z-50 bg-popover">
            <SelectItem value="all">Todas</SelectItem>
            {UF_OPTIONS.map(u=> (<SelectItem key={u} value={u}>{u}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={cert} onValueChange={(v)=>setCert(v as Cert)}>
          <SelectTrigger aria-label="Filtro por certificação"><SelectValue placeholder="Certificação" /></SelectTrigger>
          <SelectContent className="z-50 bg-popover">
            <SelectItem value="all">Todas</SelectItem>
            {CERTS.map(c=> (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
        <Input placeholder="tCO₂ mín" value={minT} onChange={e=>setMinT(e.target.value)} inputMode="numeric" aria-label="tCO2 mínimo" />
        <Input placeholder="tCO₂ máx" value={maxT} onChange={e=>setMaxT(e.target.value)} inputMode="numeric" aria-label="tCO2 máximo" />
        <Input placeholder="Preço mín" value={minP} onChange={e=>setMinP(e.target.value)} inputMode="numeric" aria-label="Preço mínimo" />
        <Input placeholder="Preço máx" value={maxP} onChange={e=>setMaxP(e.target.value)} inputMode="numeric" aria-label="Preço máximo" />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="md:col-span-2" aria-label="Ordenação"><SelectValue placeholder="Ordenar por" /></SelectTrigger>
          <SelectContent className="z-50 bg-popover">
            <SelectItem value="relevance">Relevância</SelectItem>
            <SelectItem value="price">Preço</SelectItem>
            <SelectItem value="tco2">tCO₂</SelectItem>
            <SelectItem value="recent">Mais recentes</SelectItem>
          </SelectContent>
        </Select>
        <div className="md:col-span-1">
          <Button variant="secondary" className="w-full" onClick={()=>{ setUf('all'); setCert('all'); setMinT(''); setMaxT(''); setMinP(''); setMaxP(''); setQuery(''); }}>Limpar filtros</Button>
        </div>
      </div>

      {filtered.length === 0 && (
        <Card className="p-6"><p className="text-muted-foreground">Nenhuma listagem encontrada. <Link to="/seller/new" className="underline">Crie sua primeira</Link>.</p></Card>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map(l => (
          <Card key={l.id}>
            <CardHeader><CardTitle className="text-base">{l.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <div className="h-36 rounded-md bg-primary/10" aria-hidden />
              <p>{l.locationCity}/{l.locationUF} · {l.certification}</p>
              <p>{l.tco2.toLocaleString()} tCO₂ · R$ {l.pricePerTCO2}/tCO₂</p>
              <Button asChild size="sm" className="mt-2"><Link to={`/marketplace/${l.id}`}>Ver detalhe</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <Button variant="secondary" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Anterior</Button>
        <span className="text-sm">Página {page} de {totalPages}</span>
        <Button variant="secondary" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Próxima</Button>
      </div>
    </div>
  )
}
