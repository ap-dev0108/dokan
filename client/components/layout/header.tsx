"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
            </nav>
        </header>
    );
}