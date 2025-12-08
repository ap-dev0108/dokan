import { type Product, staticProducts } from "@/lib/products"
import ProductCard from "./product-card"

interface ProductGridProps {
  products?: Product[]
  title?: string
}

export default function ProductGrid({ products = staticProducts, title }: ProductGridProps) {
  return (
    <section className="dokan-container py-12">
      {title && <h2 className="font-manrope font-bold text-4xl text-dokan-dark mb-8">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
