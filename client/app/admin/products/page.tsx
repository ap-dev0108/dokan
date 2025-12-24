"use client"

import type React from "react"

import AdminSidebar from "@/components/layout/admin-sidebar"
import { type Product } from "@/lib/products"
import { useEffect, useState } from "react"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { fetchProducts } from "@/services/productServices"

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true);

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setShowAddForm(false)
  }

  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingProduct) return

    const formData = new FormData(e.currentTarget);
    setEditingProduct(null)
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data) setProducts(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-dokan-light">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-manrope text-4xl font-bold text-dokan-dark">Product Management</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-dokan-dark text-dokan-light rounded-lg font-quicksand hover:bg-gray-800 transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* Add/Edit Form Modal */}
          {(showAddForm || editingProduct) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="font-manrope text-2xl font-bold text-dokan-dark mb-6">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block font-quicksand text-sm font-semibold text-dokan-dark mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingProduct?.productTitle}
                      required
                      className="w-full px-4 py-2 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-quicksand text-sm font-semibold text-dokan-dark mb-2">
                        Price (Rs.)
                      </label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={editingProduct?.price}
                        required
                        className="w-full px-4 py-2 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                      />
                    </div>
                    <div>
                      <label className="block font-quicksand text-sm font-semibold text-dokan-dark mb-2">
                        Original Price (Rs.)
                      </label>
                      <input
                        type="number"
                        name="originalPrice"
                        defaultValue={editingProduct?.price}
                        className="w-full px-4 py-2 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-quicksand text-sm font-semibold text-dokan-dark mb-2">Category</label>
                    <select
                      name="category"
                      defaultValue={editingProduct?.productDescription}
                      required
                      className="w-full px-4 py-2 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                    >
                      <option value="Clothing">Clothing</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Bags">Bags</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-quicksand text-sm font-semibold text-dokan-dark mb-2">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      defaultValue={editingProduct?.imageUrl}
                      required
                      className="w-full px-4 py-2 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 font-quicksand text-sm">
                      <input type="checkbox" name="featured"  />
                      Featured
                    </label>
                    <label className="flex items-center gap-2 font-quicksand text-sm">
                      <input type="checkbox" name="isNew" />
                      New
                    </label>
                    <label className="flex items-center gap-2 font-quicksand text-sm">
                      <input type="checkbox" name="onSale" />
                      On Sale
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-dokan-dark text-dokan-light rounded-lg font-quicksand hover:bg-gray-800 transition-colors"
                    >
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingProduct(null)
                      }}
                      className="flex-1 px-6 py-3 border-2 border-dokan-dark text-dokan-dark rounded-lg font-quicksand hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
            />
          </div>

          {loading && (
            <p className="text-gray-700 py-12"> Loading... </p>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.productId} className="bg-white rounded-lg border border-dokan-border overflow-hidden">
                <div className="relative h-64">
                  <Image src={product.imageUrl || "/placeholder.svg"} alt={product.productTitle} fill className="object-cover" />
                  {product && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-xs font-quicksand font-semibold rounded">
                      SALE
                    </span>
                  )}
                  {product && (
                    <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 text-xs font-quicksand font-semibold rounded">
                      NEW
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-manrope text-lg font-bold text-dokan-dark mb-2">{product.productTitle}</h3>
                  <p className="font-quicksand text-sm text-gray-600 mb-2">{product.price}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-manrope text-xl font-bold text-dokan-dark">Rs. {product.price}</span>
                    {product.price && (
                      <span className="font-quicksand text-sm text-gray-500 line-through">
                        Rs. {product.price}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-dokan-dark text-dokan-dark rounded-lg font-quicksand hover:bg-gray-100 transition-colors"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-quicksand hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="font-quicksand text-sm text-gray-600 mt-6">
            Showing {products.length} of {products.length} products
          </p>
        </div>
      </main>
    </div>
  )
}
