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
  tags?: string[]
}

export const staticProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Jacket",
    price: 4999,
    originalPrice: 6499,
    image: "/placeholder.svg?key=2uvjf",
    category: "Jackets",
    featured: true,
    onSale: true,
    tags: ["Winter", "Jackets"],
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 3199,
    image: "/placeholder.svg?key=f8acy",
    category: "Accessories",
    isNew: true,
    tags: ["New", "Accessories"],
  },
  {
    id: "3",
    name: "Sustainable Backpack",
    price: 2499,
    originalPrice: 3199,
    image: "/placeholder.svg?key=mjtrs",
    category: "Bags",
    featured: true,
    onSale: true,
    tags: ["Winter", "Bags"],
  },
  {
    id: "4",
    name: "Wool Blend Sweater",
    price: 1999,
    image: "/placeholder.svg?key=gj8r4",
    category: "Clothing",
    isNew: true,
    tags: ["Winter", "Clothing"],
  },
]

export const shopCategories = ["All", "Winter", "Jackets", "Bags", "Clothing", "Accessories"]
