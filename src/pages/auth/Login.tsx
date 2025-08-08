import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'

const Schema = z.object({ email: z.string().email(), password: z.string().min(4) })

type FormData = z.infer<typeof Schema>

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const loc = useLocation() as any
  const form = useForm<FormData>({ resolver: zodResolver(Schema) })

  async function onSubmit(data: FormData) {
    const ok = await login(data.email, data.password)
    if (ok) nav(loc.state?.from?.pathname || '/')
    else alert('Credenciais inválidas')
  }

  return (
    <div className="container py-16 max-w-md">
      <SEO title="Entrar | VerdeMarket" description="Acesse sua conta para comprar ou anunciar créditos." canonical="/auth/login" />
      <Card>
        <CardHeader><CardTitle>Entrar</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <Input placeholder="E-mail" {...form.register('email')} />
            <Input placeholder="Senha" type="password" {...form.register('password')} />
            <Button type="submit">Entrar</Button>
          </form>
          <p className="text-sm text-muted-foreground">Novo por aqui? <Link className="underline" to="/auth/register">Registrar</Link></p>
        </CardContent>
      </Card>
    </div>
  )
}
