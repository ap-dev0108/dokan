import Link from "next/link"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="relative mb-4 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.onSale && (
            <div className="absolute top-4 right-4 bg-dokan-dark text-dokan-light px-3 py-1 rounded-full font-quicksand text-sm font-semibold">
              Sale
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-dokan-dark text-dokan-light px-3 py-1 rounded-full font-quicksand text-sm font-semibold">
              New
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="font-quicksand text-sm text-gray-600 mb-2">{product.category}</p>
          <h3 className="font-manrope font-bold text-lg text-dokan-dark mb-2 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-manrope font-bold text-lg text-dokan-dark">${product.price}</span>
            {product.originalPrice && (
              <span className="font-quicksand text-sm text-gray-600 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
