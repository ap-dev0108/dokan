"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

interface Banner {
  id: number
  title: string
  subtitle: string
  description: string
  cta: string
  link: string
  bgImage: string
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Summer Deals",
    subtitle: "Exclusive Collection",
    description: "Get up to 40% off on all summer essentials",
    cta: "Shop Summer",
    link: "/collections",
    bgImage: 'url("/summer-collection-deals.jpg")',
  },
  {
    id: 2,
    title: "Winter Sales",
    subtitle: "Seasonal Special",
    description: "Cozy winter collection with 50% discount",
    cta: "Explore Winter",
    link: "/sale",
    bgImage: 'url("/winter-collection-warm.jpg")',
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Latest Trends",
    description: "Fresh new products added to our collection",
    cta: "Discover New",
    link: "/featured",
    bgImage: 'url("/new-arrivals-fashion.jpg")',
  },
  {
    id: 4,
    title: "Best Sellers",
    subtitle: "Customer Favorites",
    description: "Shop the most loved products by our community",
    cta: "View Best Sellers",
    link: "/shop",
    bgImage: 'url("/best-selling-products.jpg")',
  },
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const currentBanner = banners[currentIndex]

  return (
    <section className="relative w-full h-96 md:h-screen bg-dokan-light overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: currentBanner.bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 transition-all duration-700 bg-black/20" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center z-10">
        <div className="dokan-container text-center text-dokan-light">
          <p className="font-quicksand text-sm md:text-base uppercase tracking-widest mb-3 opacity-90">
            {currentBanner.subtitle}
          </p>
          <h1 className="font-manrope font-bold text-4xl md:text-7xl mb-4 leading-tight animate-fade-in">
            {currentBanner.title}
          </h1>
          <p className="font-quicksand text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-95">
            {currentBanner.description}
          </p>
          <Link
            href={currentBanner.link}
            className="inline-block px-8 py-3 md:py-4 bg-dokan-light text-dokan-dark rounded-full font-manrope font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            {currentBanner.cta}
          </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-dokan-light/20 hover:bg-dokan-light/40 text-dokan-light p-3 rounded-full transition-all"
        aria-label="Previous banner"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-dokan-light/20 hover:bg-dokan-light/40 text-dokan-light p-3 rounded-full transition-all"
        aria-label="Next banner"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-dokan-light w-8" : "bg-dokan-light/50 w-3 hover:bg-dokan-light/75"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
