"use client"

import type React from "react"

import { useState } from "react"

interface AuthFormWrapperProps {
  children: React.ReactNode
  isLogin?: boolean
}

export default function AuthFormWrapper({ children, isLogin = false }: AuthFormWrapperProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md perspective">
        <div
          className={`transition-all duration-500 transform ${isFlipped ? "rotate-y-180" : ""}`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="bg-[#FFFBF7] rounded-lg border border-dokan-border p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
