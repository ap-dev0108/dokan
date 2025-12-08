"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-dokan-light">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .animate-pulse-custom {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className={`w-full max-w-md transition-all duration-500 ${isAnimating ? "animate-slide-in" : ""}`}>
        <div className="bg-dokan-light rounded-lg border border-dokan-border p-8">
          <h1 className="font-manrope font-bold text-3xl text-dokan-dark mb-2">Create Account</h1>
          <p className="font-quicksand text-gray-600 mb-8">Join Dokan and start shopping</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand text-dokan-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dokan-dark focus:ring-offset-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand text-dokan-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dokan-dark focus:ring-offset-2"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand text-dokan-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dokan-dark focus:ring-offset-2"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand text-dokan-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dokan-dark focus:ring-offset-2"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="w-4 h-4 rounded border-dokan-border cursor-pointer mt-1" />
              <label htmlFor="terms" className="ml-2 font-quicksand text-gray-600 text-sm cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-dokan-dark hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-dokan-dark text-dokan-light rounded-full font-quicksand font-medium hover:bg-gray-800 transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dokan-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dokan-light text-gray-600 font-quicksand">Or</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="col-span-2 px-6 py-3 border-2 border-dokan-dark text-dokan-dark rounded-full font-quicksand font-medium hover:bg-dokan-dark hover:text-dokan-light transition-all">
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <p className="font-quicksand text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-dokan-dark hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
