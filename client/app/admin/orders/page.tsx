"use client"

import type React from "react"

import AdminSidebar from "@/components/layout/admin-sidebar"
import { mockAdminOrders, type AdminOrder } from "@/lib/admin-data"
import { useEffect, useState } from "react"
import { Search, Eye, Edit2, X } from "lucide-react"
import { getAdminOrders } from "@/services/orderServices"

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockAdminOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const apiOrders = await getAdminOrders()
        // map backend shape to AdminOrder
        const mapped: AdminOrder[] = apiOrders.map((o: any) => ({
          id: o.id,
          orderDate: new Date(o.orderDate).toISOString().slice(0, 10),
          totalAmount: o.totalAmount,
          status: o.status,
          userId: o.userId,
          userName: o.userName || "N/A",
          userEmail: o.userEmail || "",
          paymentMethod: o.paymentMethod || "N/A",
          shippingAddress: o.shippingAddress || "",
          items: (o.items || []).map((i: any) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }))
        setOrders(mapped)
      } catch (err) {
        console.warn("Falling back to mock admin orders", err)
        setOrders(mockAdminOrders)
      }
    }
    load()
  }, [])

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const updateOrderStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const openEditModal = (order: AdminOrder) => {
    setEditingOrder(order)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingOrder) {
      setOrders(orders.map((order) => (order.id === editingOrder.id ? editingOrder : order)))
      setEditingOrder(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-dokan-light">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-manrope text-4xl font-bold text-dokan-dark mb-8">Order Management</h1>

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders by ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
            />
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg border border-dokan-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-dokan-border">
                  <tr>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">Date</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">Amount</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">Status</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dokan-border">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-quicksand font-semibold text-dokan-dark">{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-quicksand font-semibold text-dokan-dark">{order.userName}</p>
                          <p className="font-quicksand text-sm text-gray-500">{order.userEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-quicksand text-sm text-gray-600">{order.orderDate}</td>
                      <td className="px-6 py-4 font-quicksand font-semibold text-dokan-dark">
                        Rs. {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-quicksand text-sm text-gray-600">{order.paymentMethod}</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as AdminOrder["status"])}
                          className={`px-3 py-1 rounded-full text-xs font-quicksand font-semibold border-0 ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => openEditModal(order)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600"
                            title="Edit Order"
                          >
                            <Edit2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <div className="bg-white rounded-lg p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-manrope text-2xl font-bold text-dokan-dark mb-6">
                  Order Details - {selectedOrder.id}
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-quicksand text-sm text-gray-600">Customer</p>
                    <p className="font-quicksand font-semibold text-dokan-dark">{selectedOrder.userName}</p>
                    <p className="font-quicksand text-sm text-gray-600">{selectedOrder.userEmail}</p>
                  </div>

                  <div>
                    <p className="font-quicksand text-sm text-gray-600">Shipping Address</p>
                    <p className="font-quicksand text-dokan-dark">{selectedOrder.shippingAddress}</p>
                  </div>

                  <div>
                    <p className="font-quicksand text-sm text-gray-600">Payment Method</p>
                    <p className="font-quicksand text-dokan-dark">{selectedOrder.paymentMethod}</p>
                  </div>

                  <div>
                    <p className="font-quicksand text-sm text-gray-600 mb-2">Items</p>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <p className="font-quicksand font-semibold text-dokan-dark">{item.name}</p>
                            <p className="font-quicksand text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-quicksand font-semibold text-dokan-dark">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                      <div className="border-t border-dokan-border pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <p className="font-quicksand font-bold text-dokan-dark">Total</p>
                          <p className="font-manrope text-xl font-bold text-dokan-dark">
                            Rs. {selectedOrder.totalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full px-6 py-3 bg-dokan-dark text-dokan-light rounded-lg font-quicksand hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Edit Order Modal */}
          {editingOrder && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setEditingOrder(null)}
            >
              <div
                className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-manrope text-2xl font-bold text-dokan-dark">Edit Order - {editingOrder.id}</h2>
                  <button
                    onClick={() => setEditingOrder(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Status</label>
                    <select
                      value={editingOrder.status}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, status: e.target.value as AdminOrder["status"] })
                      }
                      className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Shipping Address</label>
                    <textarea
                      value={editingOrder.shippingAddress}
                      onChange={(e) => setEditingOrder({ ...editingOrder, shippingAddress: e.target.value })}
                      className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Payment Method</label>
                    <input
                      type="text"
                      value={editingOrder.paymentMethod}
                      onChange={(e) => setEditingOrder({ ...editingOrder, paymentMethod: e.target.value })}
                      className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                    />
                  </div>

                  <div>
                    <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Order Items</label>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {editingOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="font-quicksand font-semibold text-dokan-dark">{item.name}</p>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const newItems = [...editingOrder.items]
                                newItems[idx].quantity = Number.parseInt(e.target.value)
                                setEditingOrder({ ...editingOrder, items: newItems })
                              }}
                              className="w-20 mt-1 px-2 py-1 border border-dokan-border rounded font-quicksand text-sm"
                            />
                          </div>
                          <p className="font-quicksand font-semibold text-dokan-dark">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setEditingOrder(null)}
                      className="flex-1 px-6 py-3 border border-dokan-border rounded-lg font-quicksand hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-dokan-dark text-white rounded-lg font-quicksand hover:bg-gray-800 transition-colors"
                    >
                      Update Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <p className="font-quicksand text-sm text-gray-600 mt-4">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>
      </main>
    </div>
  )
}
