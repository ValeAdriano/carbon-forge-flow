export type UserType = "seller" | "buyer" | "admin";

export interface User {
  id: string;
  type: UserType;
  name: string;
  email: string;
  document: string; // CNPJ/CPF
  password?: string; // apenas para simulação
  createdAt: string;
  verified: boolean;
}

export interface Listing {
  id: string;
  title: string;
  locationUF: string;
  locationCity: string;
  hectares: number;
  tco2: number;
  pricePerTCO2: number;
  certification: "VCS" | "Gold Standard" | "Outro";
  year: number;
  description: string;
  images: string[];
  sellerId: string;
  status: "draft" | "published" | "paused" | "rejected";
  createdAt: string;
}

export interface OrderItem {
  listingId: string;
  qtyTCO2: number;
  pricePerTCO2: number;
}

export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface Order {
  id: string;
  buyerId: string;
  items: OrderItem[];
  subtotal: number;
  fees: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
