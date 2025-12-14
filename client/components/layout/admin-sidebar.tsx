"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Package, ShoppingCart } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-dokan-dark text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/admin" className="font-manrope font-bold text-3xl text-white">
          Dokan Admin
        </Link>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-quicksand transition-colors ${
                isActive ? "bg-dokan-light text-dokan-dark font-semibold" : "text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-8">
        <Link
          href="/"
          className="block text-center px-4 py-2 border border-white rounded-lg font-quicksand text-white hover:bg-dokan-light hover:text-dokan-dark transition-colors"
        >
          Back to Store
        </Link>
      </div>
    </aside>
  )
}
