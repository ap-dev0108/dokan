export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
}

export type OrderResponse = {
  id: string
  userId: string
  orderDate: string
  totalAmount: number
  status: string
  paymentMethod: string
  shippingAddress: string
  items: OrderItem[]
}

