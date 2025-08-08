import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Schema = z.object({
  type: z.enum(['seller','buyer']),
  name: z.string().min(2),
  email: z.string().email(),
  document: z.string().min(5),
  password: z.string().min(4)
})

type FormData = z.infer<typeof Schema>

export default function Register() {
  const { register: doRegister } = useAuth() as any
  const nav = useNavigate()
  const form = useForm<FormData>({ resolver: zodResolver(Schema) })

  async function onSubmit(data: FormData) {
    const ok = await doRegister(data)
    if (ok) nav('/')
    else alert('Não foi possível registrar')
  }

  return (
    <div className="container py-16 max-w-md">
      <SEO title="Registrar | VerdeMarket" description="Crie sua conta de produtor ou comprador." canonical="/auth/register" />
      <Card>
        <CardHeader><CardTitle>Registrar</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <Select onValueChange={(v)=>form.setValue('type', v as any)}>
              <SelectTrigger><SelectValue placeholder="Tipo de usuário" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="seller">Produtor</SelectItem>
                <SelectItem value="buyer">Comprador</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Nome" {...form.register('name')} />
            <Input placeholder="E-mail" {...form.register('email')} />
            <Input placeholder="CNPJ/CPF" {...form.register('document')} />
            <Input placeholder="Senha" type="password" {...form.register('password')} />
            <Button type="submit">Criar conta</Button>
          </form>
          <p className="text-sm text-muted-foreground">Já tem conta? <Link className="underline" to="/auth/login">Entrar</Link></p>
        </CardContent>
      </Card>
    </div>
  )
}
