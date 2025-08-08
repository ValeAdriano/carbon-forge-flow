import { Link, NavLink, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import CookieBanner from '@/components/CookieBanner'

export default function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="container flex items-center h-16 gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary" aria-hidden />
            <span className="font-semibold">VerdeMarket</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/marketplace" className={({isActive}) => isActive ? 'text-primary' : 'text-foreground'}>Marketplace</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-primary' : 'text-foreground'}>Sobre</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'text-primary' : 'text-foreground'}>Contato</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost"><Link to="/auth/login">Entrar</Link></Button>
            <Button asChild><Link to="/auth/register">Anunciar créditos</Link></Button>
            <Button asChild variant="secondary"><Link to="/cart">Carrinho</Link></Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children ?? <Outlet />}
      </main>

      <footer className="border-t">
        <div className="container py-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-2">VerdeMarket</h3>
            <p className="text-sm text-muted-foreground">Negocie créditos de carbono com transparência.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">Sobre</Link></li>
              <li><Link to="/contact" className="hover:underline">Contato</Link></li>
              <li><Link to="/terms" className="hover:underline">Termos</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacidade</Link></li>
            </ul>
          </div>
          <div className="col-span-2">
            <h4 className="font-medium mb-2">Transparência</h4>
            <p className="text-sm text-muted-foreground">Relatórios e verificação de listagens serão adicionados em breve.</p>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  )
}
