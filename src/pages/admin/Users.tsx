import { db } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function AdminUsers() {
  const users = db.listUsers()
  return (
    <div className="container py-8">
      <SEO title="Admin | Usuários" canonical="/admin/users" />
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>
      <div className="space-y-3">
        {users.map(u => (
          <Card key={u.id}><CardHeader><CardTitle className="text-base">{u.name}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{u.type} · {u.email} · {u.verified ? 'Verificado' : 'Pendente'}</CardContent></Card>
        ))}
      </div>
    </div>
  )
}
