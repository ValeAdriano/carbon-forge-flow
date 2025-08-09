import { SEO } from '@/components/SEO'
import teamImg from '@/assets/team.jpg'


export default function About() {
  return (
    <div className="container py-12 max-w-3xl">
      <SEO title="Sobre | VerdeMarket" canonical="/about" />
      <h1 className="text-3xl font-bold mb-4">Sobre</h1>
      <img src={teamImg} alt="Equipe da VerdeMarket reunida" loading="lazy" className="w-full h-64 object-cover rounded-md border mb-4" />
      <p className="text-muted-foreground">Missão, visão e transparência do projeto.</p>
    </div>
  )
}
