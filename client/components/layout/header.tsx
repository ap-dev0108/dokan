"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { userProfile } from "@/hooks/userProfile"
import { useAuth } from "@/hooks/useAuth"

export default function Header() {
    const { IsLoggedIn, isLoading, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cartCount, setCartCount] = useState(3); // Placeholder for cart item count
    const { items, setIsOpen: setCartIsOpen } = useCart(); // Placeholder for cart sidebar state

    if (isLoading) return null;

    const handleLogout = () => {
        setIsDropdownOpen(false)
        if (typeof window !== 'undefined') localStorage.removeItem('token')
        console.log(`Token value has been removed. Mofo please login again`);
    }

    return (
        <header className="border-b border-dokan-border bg-dokan-light sticky top-0 z-50">
            <nav className="dokan-container py-4 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="font-manrope font-bold text-5xl text-dokan-dark">
                    Dokan
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/shop" className="font-quicksand text-dokan-dark hover:text-gray-600"> 
                        Shop
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="relative group">
                        <button className="font-quicksand text-dokan-dark hover:text-gray-600 flex items-center gap-2
                        transition-colors duration-200">
                            Collections
                            <ChevronDown size={16} />
                        </button>

                        <div className="absolute left-0 mt-0 w-48 bg-dokan-light border border-dokan-border rounded-lg
                        shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all
                        duration-200">
                            <Link href="/collections"
                                className="block px-4 py-2 hover:bg-gray-100 first:rounded-t-lg font-quicksand
                                text-dokan-dark">
                                All Collections
                            </Link>
                            <Link href="/collections/new" 
                                className="block px-4 py-2 hover:bg-gray-100 font-quicksand text-dokan-dark">
                                New Arrivals
                            </Link>
                            <Link href="/collections/best-sellers" 
                                className="block px-4 py-2 hover:bg-gray-100 font-quicksand text-dokan-dark">
                                Best Sellers
                            </Link>
                        </div>
                    </div>

                    <Link href="/sale" className="font-quicksand text-dokan-dark hover:text-gray-600 transition-all">
                        Sale 
                    </Link>

                    <Link href="/featured" className="font-quicksand text-dokan-dark hover:text-gray-600 transition-all">
                        Featured
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                {/* Cart Icon */}
                <button
                    onClick={() => setCartIsOpen(true)}
                    className="relative p-2 text-dokan-dark hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-dokan-dark text-dokan-light text-xs rounded-full flex items-center justify-center font-bold">
                        {cartCount}
                    </span>
                    )}
                </button>

                {IsLoggedIn ? (
                    <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="p-2 text-dokan-dark hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <User size={24} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-dokan-light border border-dokan-border rounded-lg shadow-lg">
                        <Link
                            href="/profile"
                            className="block px-4 py-3 hover:bg-gray-100 first:rounded-t-lg font-quicksand text-dokan-dark"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            View Profile
                        </Link>
                        <Link
                            href="/profile/orders"
                            className="block px-4 py-3 hover:bg-gray-100 font-quicksand text-dokan-dark"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            My Orders
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 last:rounded-b-lg font-quicksand text-dokan-dark flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                        </div>
                    )}
                    </div>
                ) : (
                    <div className="hidden md:flex items-center gap-4">
                    <Link href="/auth/login"
                        className="px-6 py-3 border-2 border-dokan-dark text-dokan-dark rounded-full font-quicksand
                        font-medium hover:bg-dokan-dark hover:text-dokan-light transition-all text-sm"
                    >
                        Login
                    </Link>

                    <Link href="/auth/register"
                        className="px-6 py-3 bg-dokan-dark text-dokan-light rounded-full font-quicksand
                        font-medium hover:bg-gray-800 transition-colors text-sm"
                    >
                        Register
                    </Link>
                </div>
                )}
                </div>
                
            </nav>
        </header>
    );
}