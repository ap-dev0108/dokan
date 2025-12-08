"use client"

import Link from "next/link"
import ProductGrid from "@/components/products/product-grid"
import { useState } from "react"

function CountdownTimer() {
  // Fixed countdown date - next day's midnight for demo
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 1)
  targetDate.setHours(0, 0, 0, 0)

  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const distance = targetDate.getTime() - now

    if (distance <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  // Client-side countdown
  if (typeof window !== "undefined") {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }

  return (
    <div className="flex gap-4 justify-center">
      {[
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-dokan-dark text-dokan-light rounded-lg flex items-center justify-center">
            <span className="font-manrope font-bold text-2xl">{String(item.value).padStart(2, "0")}</span>
          </div>
          <span className="font-quicksand text-sm text-gray-600 mt-2">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-dokan-light border-b border-dokan-border py-24">
        <div className="dokan-container text-center">
          <p className="font-quicksand text-sm text-gray-600 mb-4 uppercase tracking-wide">Premium Collection</p>
          <h1 className="font-manrope font-bold text-6xl md:text-7xl text-dokan-dark mb-6 leading-tight">
            Curated for Excellence
          </h1>
          <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our handpicked selection of premium products crafted for those who demand quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-6 py-3 bg-dokan-dark text-dokan-light rounded-full font-quicksand font-medium hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/featured"
              className="px-6 py-3 border-2 border-dokan-dark text-dokan-dark rounded-full font-quicksand font-medium hover:bg-dokan-dark hover:text-dokan-light transition-all"
            >
              Explore Featured
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-dokan-dark text-dokan-light py-16 border-b border-dokan-border">
        <div className="dokan-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <p className="font-quicksand text-sm uppercase tracking-widest mb-2 text-gray-300">Special Offer</p>
              <h2 className="font-manrope font-bold text-5xl md:text-6xl mb-4">Winter Sales</h2>
              <p className="font-quicksand text-lg text-gray-300 mb-6">
                Up to 50% off on selected winter collection items.
              </p>
              <Link
                href="/sale"
                className="inline-block px-8 py-4 bg-dokan-light text-dokan-dark rounded-full font-manrope font-bold hover:bg-gray-200 transition-colors"
              >
                Shop Winter Sale
              </Link>
            </div>
            <div className="flex-1 text-center">
              <p className="font-quicksand text-sm uppercase tracking-widest mb-6 text-gray-300">Sale Ends In</p>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid title="Featured Products" />

      <section className="bg-dokan-light border-b border-dokan-border py-16">
        <div className="dokan-container">
          <h2 className="font-manrope font-bold text-4xl text-dokan-dark mb-4 text-center">Hot Deals</h2>
          <p className="font-quicksand text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Limited time offers on premium products. Don't miss out!
          </p>
          <div className="bg-dokan-dark text-dokan-light rounded-lg p-8 md:p-12 text-center">
            <p className="font-quicksand text-sm uppercase tracking-widest mb-4 text-gray-300">Offers Expire In</p>
            <CountdownTimer />
            <Link
              href="/sale"
              className="inline-block mt-8 px-8 py-4 bg-dokan-light text-dokan-dark rounded-full font-manrope font-bold hover:bg-gray-200 transition-colors"
            >
              View All Hot Deals
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dokan-dark py-16 border-t border-dokan-border">
        <div className="dokan-container text-center">
          <h2 className="font-manrope font-bold text-4xl text-dokan-light mb-4">Join Our Community</h2>
          <p className="font-quicksand text-gray-300 mb-8 max-w-xl mx-auto">
            Get exclusive access to new collections and special offers.
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-4 bg-dokan-light text-dokan-dark rounded-full font-manrope font-bold hover:bg-gray-200 transition-colors"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </>
  )
}
