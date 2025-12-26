import type { Metadata } from "next";
import { Manrope, Quicksand } from "next/font/google";
import "../app/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Quicksand({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dokan - An Ecommerce Multi Vendor Marketplace",
  description: "An Ecommerce Multi Vendor Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
              {children}
            <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
