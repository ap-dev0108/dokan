export interface User {
  id: string
  username: string
  email: string
  phone: string
  joinedDate: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  orderDate: string
  totalAmount: number
  status: "pending" | "shipped" | "delivered"
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
}

// Mock user data
export const mockUser: User = {
  id: "user123",
  username: "johndoe",
  email: "john@example.com",
  phone: "+977-9841234567",
  joinedDate: "2024-01-15",
}

// Mock orders
export const mockOrders: Order[] = [
  {
    id: "ORD001",
    orderDate: "2024-12-01",
    totalAmount: 4500,
    status: "delivered",
    items: [
      { name: "Leather Jacket", price: 2500, quantity: 1 },
      { name: "Wool Sweater", price: 1500, quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    orderDate: "2024-12-08",
    totalAmount: 3200,
    status: "shipped",
    items: [{ name: "Sustainable Backpack", price: 3200, quantity: 1 }],
  },
  {
    id: "ORD003",
    orderDate: "2024-12-10",
    totalAmount: 1800,
    status: "pending",
    items: [{ name: "Minimalist Watch", price: 1800, quantity: 1 }],
  },
]

// Mock cart
export const mockCart: CartItem[] = [
  {
    id: "1",
    name: "Leather Jacket",
    price: 2500,
    quantity: 1,
    image: "/leather-jacket.jpg",
  },
  {
    id: "4",
    name: "Minimalist Watch",
    price: 1800,
    quantity: 2,
    image: "/minimalist-watch.jpg",
  },
]
