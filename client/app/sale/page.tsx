"use client"

import { fetchSaleProducts } from "@/services/productServices"
import { Product } from "@/lib/products"
import { useEffect, useState } from "react"

export default function SalesPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchSaleProducts();
        if (data) {
          setProducts(data);
          console.log("Sales Data: ", data)
        }
        setLoading(false);
      }
      catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading)
    return <p className="text-center py-12"> Loading Products </p>

  return (
    <div>
      {/* Header */}
      <section className="border-b border-dokan-border py-12">
        <div className="dokan-container">
          <h1 className="font-manrope font-bold text-5xl text-dokan-dark mb-4">On Sale</h1>
          <p className="font-quicksand text-lg text-gray-600">Shop exclusive sale items with up to 50% off.</p>
        </div>
      </section>

      {/* <section className="border-b border-dokan-border">
        <div className="dokan-container py-6">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {products.map((product) => (
              <a
                key={product.productId}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-quicksand font-medium transition-colors border-2 border-dokan-border text-dokan-dark hover:border-dokan-dark
                }`}
              >
                <div className="mb-4 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.productTitle}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="font-manrope font-bold text-lg"> {product.productTitle} </h3>

                <p className="font-quicksand text-gray-600"> Rs.{product.price} </p>
              </a>
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              No Products Available
            </p>
          )};

        </div>
      </section> */}

      {/* Products */}
      <section className="py-12">
        <div className="dokan-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <a key={product.productId} href={`/product/${product.productId}`} className="group cursor-pointer">
                <div className="relative mb-4 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.productTitle}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                  </div>
                </div>
                <h3 className="font-manrope font-bold text-lg text-dokan-dark mb-2 group-hover:text-gray-600 transition-colors">
                  {product.productTitle}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-manrope font-bold text-lg text-dokan-dark">Rs. {product.price}</span>
                  {product.price && (
                    <span className="font-quicksand text-sm text-gray-600 line-through">
                      Rs. {product.price}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
