export type Product = {
  productId: string;
  productTitle: string;
  productDescription: string;
  price?: number;
  markedPrice?: number;
  imageUrl?: string;
};

export type ProductResponse = {
  productID: string;
  productDetails?: {
    productId: string;
    productTitle: string;
    productDescription: string;
    markedPrice: number;
    imageUrl?: string;
  };
  productMeta?: {
    isSale: boolean;
    salePrice?: number;
    isNew?: boolean;
    stock: number;
    category: string;
  };
};

export type RelatedProducts = {
  productId: string;
  productTitle: string;
  price?: number;
  imageUrl?: string;
  markedPrice?:number;
  category: string;
}

export const mapProductResponse = (data: ProductResponse): Product => {
  return {
    productId: data.productID || data.productDetails?.productId,
    productTitle: data.productDetails?.productTitle || '',
    productDescription: data.productDetails?.productDescription || '',
    markedPrice: data.productDetails?.markedPrice,
    price: data.productMeta?.salePrice || data.productDetails?.markedPrice,
    imageUrl: data.productDetails?.imageUrl,
    isSale: data.productMeta?.isSale,
    salePrice: data.productMeta?.salePrice,
    isNew: data.productMeta?.isNew,
    stock: data.productMeta?.stock,
    category: data.productMeta?.category || '',
  };
};

export const mapRelatedProducts = (data: any): RelatedProducts[] => {
    if (!data) return [];
    return Array.isArray(data) ? data.map(mapProducts) : [mapProducts(data)];
}

export const mapProducts = (data: ProductResponse): RelatedProducts => {
  return {
    productId: data.productDetails?.productId,
    productTitle: data.productDetails?.productTitle,
    markedPrice: data.productDetails?.markedPrice,
    price: data.productMeta?.salePrice || data.productDetails?.markedPrice,
    imageUrl: data.productDetails?.imageUrl,
    category: data.productMeta?.category || ''
  }
}

export const mapSalesProducts = (data: any): RelatedProducts[] => {
  if (!data) return [];
  return Array.isArray(data) ? data.map(mapProducts) : [mapProducts(data)];
}
