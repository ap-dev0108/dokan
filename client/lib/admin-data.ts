import type { User, Order } from "./user-data"

export interface AdminUser extends User {
  role: "user" | "admin" | "moderator"
  status: "active" | "banned"
  totalOrders: number
  totalSpent: number
}

export interface AdminOrder extends Order {
  userId: string
  userName: string
  userEmail: string
  paymentMethod: string
  shippingAddress: string
}

export interface SalesData {
  month: string
  revenue: number
  orders: number
}

export interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  lowStockProducts: number
  salesData: SalesData[]
  userGrowthData: { month: string; users: number }[]
}

// Mock admin users
export const mockAdminUsers: AdminUser[] = [
  {
    id: "user123",
    username: "johndoe",
    email: "john@example.com",
    phone: "+977-9841234567",
    joinedDate: "2024-01-15",
    role: "user",
    status: "active",
    totalOrders: 3,
    totalSpent: 9500,
  },
  {
    id: "user124",
    username: "janedoe",
    email: "jane@example.com",
    phone: "+977-9841234568",
    joinedDate: "2024-02-20",
    role: "user",
    status: "active",
    totalOrders: 5,
    totalSpent: 15000,
  },
  {
    id: "user125",
    username: "admin",
    email: "admin@dokan.com",
    phone: "+977-9841234569",
    joinedDate: "2023-12-01",
    role: "admin",
    status: "active",
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: "user126",
    username: "bobsmith",
    email: "bob@example.com",
    phone: "+977-9841234570",
    joinedDate: "2024-03-10",
    role: "user",
    status: "banned",
    totalOrders: 1,
    totalSpent: 2500,
  },
]

// Mock admin orders
export const mockAdminOrders: AdminOrder[] = [
  {
    id: "ORD001",
    orderDate: "2024-12-01",
    totalAmount: 4500,
    status: "delivered",
    userId: "user123",
    userName: "johndoe",
    userEmail: "john@example.com",
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, Kathmandu, Nepal",
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
    userId: "user123",
    userName: "johndoe",
    userEmail: "john@example.com",
    paymentMethod: "eSewa",
    shippingAddress: "123 Main St, Kathmandu, Nepal",
    items: [{ name: "Sustainable Backpack", price: 3200, quantity: 1 }],
  },
  {
    id: "ORD003",
    orderDate: "2024-12-10",
    totalAmount: 1800,
    status: "pending",
    userId: "user124",
    userName: "janedoe",
    userEmail: "jane@example.com",
    paymentMethod: "Cash on Delivery",
    shippingAddress: "456 Park Ave, Pokhara, Nepal",
    items: [{ name: "Minimalist Watch", price: 1800, quantity: 1 }],
  },
  {
    id: "ORD004",
    orderDate: "2024-12-12",
    totalAmount: 5999,
    status: "pending",
    userId: "user124",
    userName: "janedoe",
    userEmail: "jane@example.com",
    paymentMethod: "Khalti",
    shippingAddress: "456 Park Ave, Pokhara, Nepal",
    items: [
      { name: "Premium Leather Jacket", price: 4999, quantity: 1 },
      { name: "Wool Sweater", price: 1999, quantity: 1 },
    ],
  },
]

// Mock analytics data
export const mockAnalytics: AnalyticsData = {
  totalRevenue: 156789,
  totalOrders: 48,
  totalUsers: 134,
  lowStockProducts: 5,
  salesData: [
    { month: "Jul", revenue: 12000, orders: 8 },
    { month: "Aug", revenue: 18000, orders: 12 },
    { month: "Sep", revenue: 15000, orders: 10 },
    { month: "Oct", revenue: 22000, orders: 15 },
    { month: "Nov", revenue: 28000, orders: 18 },
    { month: "Dec", revenue: 35000, orders: 22 },
  ],
  userGrowthData: [
    { month: "Jul", users: 85 },
    { month: "Aug", users: 95 },
    { month: "Sep", users: 105 },
    { month: "Oct", users: 115 },
    { month: "Nov", users: 125 },
    { month: "Dec", users: 134 },
  ],
}
