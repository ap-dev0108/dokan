"use client"

import Link from "next/link";
import { fetchProductsById } from "@/services/productServices";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RelatedProductsComponent } from "@/components/products/related-products";

export default function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const { id } = useParams();

    const API_URL = process.env.NEXT_PUBLIC_API_BASE;

    useEffect(() => {
        if (!id) return;

        const loadProducts = async() => {
            try {
                const productId = Array.isArray(id) ? id[0] : id;
                const data = await fetchProductsById(productId);
                if (data) {
                    setProduct(data);
                    console.log("Data: ", data);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    if (loading)
        return <p className="text-center py-12"> Loading Product </p>

    return (
        <section className="dokan-container py-12">
            <Link href="/shop" className="font-quicksand text-gray-600 hover:text-dokan-dark mb-8 inline-block">
                ← Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gray-200 rounded-lg overflow-hidden h-[500px]">
                    <img src={`${API_URL}/${product.imageUrl}` || 'placholder.svg'} alt={product.name} className="w-full h-full object-cover"/>
                </div>

                <div>
                    <p className="font-quicksand text-sm text-gray-600 mb-4">{product.category}</p>
                    <h1 className="font-manrope font-bold text-4xl text-dokan-dark mb-4">{product.productTitle}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-manrope font-bold text-3xl text-dokan-dark"> Rs.{product.price} </span>

                        {product.markedPrice && (
                            <span className="font-quicksand text-lg text-gray-600 line-through">Rs. {product.markedPrice}</span>
                        )}

                        <span className="font-quicksand text-sm text-orange-600">
                            {Math.round(((product.markedPrice - product.price) / product.markedPrice) * 100)}% OFF
                        </span>
                    </div>
                    
                    <p className="font-quicksand text-gray-600 mb-8">
                        {product.productDescription}
                    </p>

                    <button className="w-full px-6 py-3 bg-dokan-dark text-dokan-light rounded-full font-quicksand font-medium
                     hover:bg-gray-800 transition-colors"> Add to Cart </button>
                </div>
            </div>

            <RelatedProductsComponent category={product.category} />
        </section>
    );
}