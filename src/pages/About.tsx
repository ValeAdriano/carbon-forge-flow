import { SEO } from '@/components/SEO'

export default function About() {
  return (
    <div className="container py-12 max-w-3xl">
      <SEO title="Sobre | VerdeMarket" canonical="/about" />
      <h1 className="text-3xl font-bold mb-4">Sobre</h1>
      <p className="text-muted-foreground">Missão, visão e transparência do projeto.</p>
    </div>
  )
}
