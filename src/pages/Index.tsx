import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";
import { db, seedIfEmpty } from "@/data/mock";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const listings = useMemo(() => db.listListings().slice(0,8), [])

  useEffect(() => {
    seedIfEmpty();
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div>
      <SEO title="VerdeMarket | Negocie créditos de carbono com transparência" description="Marketplace de créditos de carbono. Explore, anuncie e negocie com confiança." canonical="/" />

      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Negocie créditos de carbono com transparência</h1>
            <p className="text-lg text-muted-foreground">Conectamos produtores e compradores com processos claros, verificação e relatórios básicos.</p>
            <div className="flex gap-3">
              <Button asChild><Link to="/marketplace">Explorar créditos</Link></Button>
              <Button asChild variant="secondary"><Link to="/auth/register">Anunciar créditos</Link></Button>
            </div>
          </div>
          <div className="rounded-lg bg-primary/5 border p-8">
            <div className="h-48 md:h-64 rounded-md bg-primary/10" aria-label="Ilustração placeholder" />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-y">
        <div className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Cadastre-se","Anuncie ou Busque","Negocie com segurança"].map((t,i)=> (
              <Card key={i} className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">{i+1}. {t}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Processo simples e direto para produtores e compradores.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold mb-4">Destaques do Marketplace</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? Array.from({length:8}).map((_,i)=> (
            <Card key={i} className="animate-pulse h-48" />
          )) : listings.map((l) => (
            <Card key={l.id}>
              <CardHeader>
                <CardTitle className="text-base">{l.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>{l.locationCity}/{l.locationUF} · {l.certification}</p>
                <p>{l.tco2.toLocaleString()} tCO₂ · R$ {l.pricePerTCO2}/tCO₂</p>
                <Button asChild size="sm" className="mt-2"><Link to={`/marketplace/${l.id}`}>Ver detalhe</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 border-y">
        <div className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">Benefícios</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {t:'Confiança',d:'Processos claros e verificações.'},
              {t:'Verificação',d:'Certificações destacadas.'},
              {t:'Relatórios',d:'Indicadores básicos disponíveis.'},
            ].map((b,i)=> (
              <Card key={i}><CardHeader><CardTitle className="text-base">{b.t}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{b.d}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold mb-6">Depoimentos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({length:3}).map((_,i)=> (
            <Card key={i}><CardContent className="pt-6 text-sm text-muted-foreground">“Plataforma simples e objetiva.” — Cliente {i+1}</CardContent></Card>
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex gap-3">
          <Button asChild><Link to="/marketplace">Explorar créditos</Link></Button>
          <Button asChild variant="secondary"><Link to="/auth/register">Anunciar créditos</Link></Button>
        </div>
      </section>
    </div>
  );
}
