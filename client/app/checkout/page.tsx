"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createOrder } from "@/services/orderServices"
import { mockCart } from "@/lib/user-data"
import type { OrderItem } from "@/types/order"

export default function CheckoutPage() {
  const router = useRouter()
  const [shippingAddress, setShippingAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [items, setItems] = useState<OrderItem[]>([])
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  useEffect(() => {
    // In absence of a cart store, fallback to mock cart
    setItems(
      mockCart.map((c) => ({
        productId: c.id,
        name: c.name,
        price: c.price,
        quantity: c.quantity,
      })),
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!items.length) return alert("Cart is empty")
    if (!shippingAddress.trim()) return alert("Shipping address is required")

    try {
      setIsSubmitting(true)
      await createOrder({
        shippingAddress,
        paymentMethod,
        items,
      })
      alert("Order placed successfully")
      router.push("/profile")
    } catch (err) {
      console.error("Checkout error", err)
      alert("Could not place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <div>
            <label className="block font-semibold mb-2">Shipping Address</label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full border rounded-lg p-3"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>Cash on Delivery</option>
              <option>eSewa</option>
              <option>Khalti</option>
              <option>Card</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Placing order..." : "Place Order"}
          </button>
        </form>

        <aside className="bg-white border rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}

