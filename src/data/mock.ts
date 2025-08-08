import { Listing, Order, OrderItem, User } from "@/types";
import { storage } from "@/lib/storage";

const USERS_KEY = "vm_users";
const LISTINGS_KEY = "vm_listings";
const ORDERS_KEY = "vm_orders";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

export function seedIfEmpty() {
  const hasUsers = storage.get<User[]>(USERS_KEY, []).length > 0
  const hasListings = storage.get<Listing[]>(LISTINGS_KEY, []).length > 0
  const hasOrders = storage.get<Order[]>(ORDERS_KEY, []).length > 0

  if (!hasUsers) {
    const users: User[] = [
      { id: uid('u'), type: 'seller', name: 'Floresta Sul', email: 'vendas@florestasul.com', document: '12.345.678/0001-90', createdAt: new Date().toISOString(), verified: true },
      { id: uid('u'), type: 'seller', name: 'Carbono Verde LTDA', email: 'contato@carbonoverde.com', document: '23.456.789/0001-01', createdAt: new Date().toISOString(), verified: false },
      { id: uid('u'), type: 'buyer', name: 'Eco Compras', email: 'compras@eco.com', document: '123.456.789-00', createdAt: new Date().toISOString(), verified: true },
    ]
    storage.set(USERS_KEY, users)
  }

  if (!hasListings) {
    const sellers = storage.get<User[]>(USERS_KEY, [])
    const sellerId = sellers.find(s => s.type === 'seller')?.id || uid('u')

    const sample: Omit<Listing, 'id'|'createdAt'>[] = [
      { title: 'Projeto Mata Atlântica', locationUF: 'SP', locationCity: 'Ubatuba', hectares: 120, tco2: 15000, pricePerTCO2: 42, certification: 'VCS', year: 2023, description: 'Créditos oriundos de reflorestamento nativo.', images: [], sellerId, status: 'published' },
      { title: 'Reserva Amazônica', locationUF: 'AM', locationCity: 'Manaus', hectares: 500, tco2: 80000, pricePerTCO2: 38, certification: 'Gold Standard', year: 2022, description: 'Proteção de floresta primária.', images: [], sellerId, status: 'published' },
      { title: 'Cerrado Sustentável', locationUF: 'GO', locationCity: 'Goiânia', hectares: 300, tco2: 40000, pricePerTCO2: 35, certification: 'VCS', year: 2024, description: 'Manejo sustentável e recuperação.', images: [], sellerId, status: 'published' },
      { title: 'Caatinga Viva', locationUF: 'BA', locationCity: 'Juazeiro', hectares: 200, tco2: 22000, pricePerTCO2: 30, certification: 'Outro', year: 2021, description: 'Créditos de conservação.', images: [], sellerId, status: 'published' },
      { title: 'Pampa Protegido', locationUF: 'RS', locationCity: 'Bagé', hectares: 150, tco2: 12000, pricePerTCO2: 28, certification: 'VCS', year: 2020, description: 'Preservação de campos nativos.', images: [], sellerId, status: 'published' },
      { title: 'Pantanal Carbono', locationUF: 'MT', locationCity: 'Poconé', hectares: 450, tco2: 60000, pricePerTCO2: 40, certification: 'Gold Standard', year: 2023, description: 'Conservação do pantanal.', images: [], sellerId, status: 'published' },
      { title: 'Amazônia Norte', locationUF: 'PA', locationCity: 'Altamira', hectares: 700, tco2: 110000, pricePerTCO2: 44, certification: 'VCS', year: 2024, description: 'Créditos REDD+. ', images: [], sellerId, status: 'published' },
      { title: 'Verde Minas', locationUF: 'MG', locationCity: 'Belo Horizonte', hectares: 90, tco2: 9000, pricePerTCO2: 26, certification: 'Outro', year: 2019, description: 'Reflorestamento urbano.', images: [], sellerId, status: 'published' },
      { title: 'Acre Sustentável', locationUF: 'AC', locationCity: 'Rio Branco', hectares: 320, tco2: 50000, pricePerTCO2: 36, certification: 'VCS', year: 2022, description: 'Conservação comunitária.', images: [], sellerId, status: 'published' },
      { title: 'Rondas Verdes', locationUF: 'RO', locationCity: 'Porto Velho', hectares: 260, tco2: 34000, pricePerTCO2: 33, certification: 'VCS', year: 2021, description: 'Proteção e monitoramento.', images: [], sellerId, status: 'published' },
      { title: 'Chapada do Araripe', locationUF: 'CE', locationCity: 'Crato', hectares: 140, tco2: 16000, pricePerTCO2: 29, certification: 'Outro', year: 2020, description: 'Recuperação de áreas.', images: [], sellerId, status: 'published' },
      { title: 'Mata de Araucárias', locationUF: 'PR', locationCity: 'Curitiba', hectares: 210, tco2: 25000, pricePerTCO2: 31, certification: 'Gold Standard', year: 2022, description: 'Proteção de espécies nativas.', images: [], sellerId, status: 'published' }
    ]

    const listings: Listing[] = sample.map(l => ({ ...l, id: uid('l'), createdAt: new Date().toISOString() }))
    storage.set(LISTINGS_KEY, listings)
  }

  if (!hasOrders) {
    const users = storage.get<User[]>(USERS_KEY, [])
    const buyerId = users.find(u => u.type === 'buyer')?.id || uid('u')
    const listings = storage.get<Listing[]>(LISTINGS_KEY, [])
    const orders: Order[] = Array.from({ length: 5 }).map(() => {
      const item: OrderItem = { listingId: listings[Math.floor(Math.random()*listings.length)].id, qtyTCO2: 1000, pricePerTCO2: 35 }
      const subtotal = item.qtyTCO2 * item.pricePerTCO2
      const fees = Math.round(subtotal * 0.02)
      return { id: uid('o'), buyerId, items: [item], subtotal, fees, total: subtotal + fees, status: 'completed', createdAt: new Date().toISOString() }
    })
    storage.set(ORDERS_KEY, orders)
  }
}

export const db = {
  usersKey: USERS_KEY,
  listingsKey: LISTINGS_KEY,
  ordersKey: ORDERS_KEY,
  listUsers: () => storage.get<User[]>(USERS_KEY, []),
  listListings: () => storage.get<Listing[]>(LISTINGS_KEY, []),
  listOrders: () => storage.get<Order[]>(ORDERS_KEY, []),
  saveUsers: (u: User[]) => storage.set(USERS_KEY, u),
  saveListings: (l: Listing[]) => storage.set(LISTINGS_KEY, l),
  saveOrders: (o: Order[]) => storage.set(ORDERS_KEY, o),
}
