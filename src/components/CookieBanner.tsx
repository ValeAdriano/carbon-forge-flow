import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const KEY = 'vm_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const ok = localStorage.getItem(KEY)
    setVisible(!ok)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Usamos cookies para melhorar sua experiência. Isto é um placeholder de consentimento.
        </p>
        <div className="ml-auto flex gap-2">
          <Button variant="secondary" onClick={() => { localStorage.setItem(KEY, 'dismissed'); setVisible(false) }}>Recusar</Button>
          <Button onClick={() => { localStorage.setItem(KEY, 'accepted'); setVisible(false) }}>Aceitar</Button>
        </div>
      </div>
    </div>
  )
}
