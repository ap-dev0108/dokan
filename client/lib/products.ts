export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  featured?: boolean
  isNew?: boolean
  onSale?: boolean
}

export const staticProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Jacket",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?key=2uvjf",
    category: "Jackets",
    featured: true,
    onSale: true,
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 199,
    image: "/placeholder.svg?key=f8acy",
    category: "Accessories",
    isNew: true,
  },
  {
    id: "3",
    name: "Sustainable Backpack",
    price: 149,
    originalPrice: 189,
    image: "/placeholder.svg?key=mjtrs",
    category: "Bags",
    featured: true,
    onSale: true,
  },
  {
    id: "4",
    name: "Wool Blend Sweater",
    price: 129,
    image: "/placeholder.svg?key=gj8r4",
    category: "Clothing",
    isNew: true,
  },
]
