"use client"

import { X, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
export default function CartSidebar() {

    const [items, setItems] =  useState<any[]>([]); // Placeholder for cart items
    const [isOpen, setIsOpen] = useState(false); // Control sidebar visibility
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-dokan-light border-l border-dokan-border z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <ShoppingBag size={24} className="text-dokan-dark" />
              <h2 className="font-manrope font-bold text-xl text-dokan-dark">Your Cart</h2>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="font-quicksand text-gray-600 text-center">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="bg-white border border-dokan-border rounded-lg p-4">
                    <div className="flex gap-4 mb-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-manrope font-bold text-sm text-dokan-dark">{item.name}</h3>
                        <p className="font-quicksand text-sm text-gray-600">Rs. {item.price.toLocaleString()}</p>
                      </div>
                      <button
                        className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Quantity Editor */}
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 border border-dokan-border rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-quicksand text-sm">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border border-dokan-border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                      <span className="ml-auto font-manrope font-bold text-dokan-dark">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-dokan-border pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="font-quicksand text-gray-600">Total:</span>
                  <span className="font-manrope font-bold text-lg text-dokan-dark">Rs. 1000</span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full px-6 py-3 bg-dokan-dark text-dokan-light rounded-lg font-quicksand font-medium text-center hover:bg-gray-900 transition-colors"
                >
                  Checkout
                </Link>
                <Link
                  href="/profile/cart"
                  className="block w-full px-6 py-3 border-2 border-dokan-dark text-dokan-dark rounded-lg font-quicksand font-medium text-center hover:bg-gray-100 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
