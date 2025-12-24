"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { LoginFormData } from "@/lib/types/form"
import { useRouter } from "next/navigation"
import { getUserFromToken } from "@/services/authServices"

export default function LoginPage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [formData, setFormData] = useState<LoginFormData>({
    usermail: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const user = async () => {
      const role = await getUserFromToken();
      
      if (!role) router.push('/auth/login');
      else if (role.roles[0] == 'Admin') router.push('/admin');
      else router.push('/profile');
    }

    user();
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const res = await axios.post("http://localhost:5213/login", formData);
      console.log("Status", res.status);

      if (res.status == 200) router.push('/profile');

      console.log("Response Data:", res.data);
      localStorage.setItem("token", res.data.token);
      
    } catch (error) {
      console.error("Login error:", error);
    }

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
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      <div className={`w-full max-w-md transition-all duration-500 ${isAnimating ? "animate-slide-in" : ""}`}>
        <div className="bg-dokan-light rounded-lg border border-dokan-border p-8">
          <h1 className="font-manrope font-bold text-3xl text-dokan-dark mb-2">Welcome Back</h1>
          <p className="font-quicksand text-gray-600 mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Email</label>
              <input
                type="email"
                name="usermail"
                placeholder="you@example.com"
                value={formData.usermail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand text-dokan-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dokan-dark focus:ring-offset-2"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand text-dokan-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dokan-dark focus:ring-offset-2"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-dokan-border cursor-pointer" />
              <label htmlFor="remember" className="ml-2 font-quicksand text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-dokan-dark text-dokan-light rounded-full font-quicksand font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
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
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-dokan-dark hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
