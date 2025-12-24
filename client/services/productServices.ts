import axios from 'axios';
import { ProductResponse, mapProductResponse, mapRelatedProducts, mapSalesProducts } from '@/lib/products';

export const fetchProducts = async() => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/Product/allProducts`);
        console.log("Product Data:", res.data.productData);
        
        // Map the response to match the Product type
        const mappedProducts = res.data.productData.map((product: ProductResponse) => 
            mapProductResponse(product)
        );
        
        return mappedProducts;
    } catch (error) {
        console.log("Product fetch error:", error);
        return [];
    }
}

export const fetchProductsById = async(id: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/Product/${id}`);

        return mapProductResponse(res.data.productData);
    } catch (error) {
        console.log("Product fetch by ID error:", error);
        return null;
    }
}

export const relatedProducts = async(category: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/Product/filterProducts/${category}`);
        console.log("Related Products Data:", res.data.productData);

        return mapRelatedProducts(res.data.productData || []);
    } catch (error) {
        console.log("Related products fetch error:", error);
        return [];
    }
}

export const fetchSaleProducts = async() => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/Product/saleProducts`);
        console.log("Sale Products Data:", res.data.productData);

        return mapSalesProducts(res.data.productData || []);
    } catch (error) {
        console.log("Sale products fetch error:", error);
        return [];
    }
}