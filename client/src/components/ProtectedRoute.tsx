"use client"

import type React from "react"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: "admin" | "user";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    if (requiredRole === "admin") {
        // if user is not admin
        return <Navigate to="/admin" replace />
    } else {
        return <Navigate to= "/user" replace/>
    }
    return <>{children}</>
}