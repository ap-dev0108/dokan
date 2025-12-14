"use client";

import { Product } from "@/lib/products";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5213/api/Product/allProducts"
        );
        setProducts(res.data.productData);
        console.log("Fetched products:", res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 text-center">
        <p>Loading products…</p>
      </section>
    );
  }

  return (
    <section className="bg-dokan-light">
      <div className="dokan-container py-12">
        {/* ONE heading, not inside map */}
        <h2 className="font-manrope font-bold text-4xl text-dokan-dark mb-8">
          Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.productId}
              product={product}
            />
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
