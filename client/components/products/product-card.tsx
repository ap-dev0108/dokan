import Link from "next/link";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.productId}`}>
      <div className="group cursor-pointer">
        <div className="relative mb-4 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.productTitle}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div>
          <h3 className="font-manrope font-bold text-lg text-dokan-dark mb-2">
            {product.productTitle}
          </h3>

          <span className="font-manrope font-bold text-lg text-dokan-dark">
            Rs. {product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
