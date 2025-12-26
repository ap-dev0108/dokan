import axios from "axios"
import { OrderItem } from "@/types/order"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}
}

export const createOrder = async (payload: {
  shippingAddress: string
  paymentMethod: string
  items: OrderItem[]
}) => {
  const res = await axios.post(
    `${API_BASE}/api/Order/checkout`,
    {
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      items: payload.items.map((i) => ({
        productId: i.productId,
        productTitle: i.name,
        unitPrice: i.price,
        quantity: i.quantity,
      })),
    },
    { headers: { "Content-Type": "application/json", ...getAuthHeaders() } },
  )

  return res.data
}

export const getMyOrders = async () => {
  const res = await axios.get(`${API_BASE}/api/Order/myOrders`, {
    headers: getAuthHeaders(),
  })
  return res.data.orders
}

export const getAdminOrders = async () => {
  const res = await axios.get(`${API_BASE}/api/Order/allOrders`, {
    headers: getAuthHeaders(),
  })
  return res.data.orders
}

