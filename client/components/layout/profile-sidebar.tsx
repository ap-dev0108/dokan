"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, ShoppingBag, Heart, LogOut } from "lucide-react"

export default function ProfileSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Cart", href: "/profile/cart", icon: ShoppingBag },
    { label: "Order History", href: "/profile/orders", icon: Heart },
  ]

  return (
    <div className="bg-dokan-light p-6">
      <h2 className="font-manrope font-bold text-xl text-dokan-dark mb-6">My Account</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-quicksand ${
                isActive ? "bg-dokan-dark text-dokan-light" : "text-dokan-dark hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-dokan-dark hover:bg-gray-100 transition-colors font-quicksand mt-4 pt-4 border-t border-dokan-border">
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </div>
  )
}
