"use client"

import { relatedProducts } from "@/services/productServices";
import { useState, useEffect } from "react"
import Link from "next/link";
import { RelatedProducts } from "@/lib/products";

export function RelatedProductsComponent({category} : {category: string}) {
    const [relatedProduct, setRelatedProducts] = useState<RelatedProducts[]>([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!category) return;
            try {
                const relatedProductsData = await relatedProducts(category);
                setRelatedProducts(relatedProductsData || []);
                console.log("Related Products: ", relatedProductsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRelatedProducts();
    }, [category]);

    return (
        <div className="mt-16 pt-16 border-t border-dokan-border">
        <h2 className="font-manrope font-bold text-3xl text-dokan-dark mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProduct.map((relatedProduct) => (
            <Link key={relatedProduct.productId} href={`/product/${relatedProduct.productId}`} className="group">
                <div className="relative mb-4 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE}/${relatedProduct.imageUrl}`}
                    alt={relatedProduct.productTitle}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-quicksand text-sm text-gray-600 mb-2">{relatedProduct.category}</p>
                <h3 className="font-manrope font-bold text-dokan-dark">{relatedProduct.productTitle}</h3>
                <p className="font-manrope font-bold text-lg text-dokan-dark">Rs. {relatedProduct.price}</p>
              </Link>
          ))
              
        }
        </div>
      </div>
    );
}