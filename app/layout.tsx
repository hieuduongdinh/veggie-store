
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, MapPin, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fresh Veggies Store",
  description: "Mua rau củ quả hữu cơ tươi ngon trực tiếp từ nông trại",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen">
            {/* Header */}
            <header className="bg-green-600 text-white">
              {/* Top navigation */}
              <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo Fresh Veggies" width={40} height={40} className="w-10 h-10" />
                    <span className="text-xl font-bold">Fresh Veggies Store</span>
                  </Link>

                  {/* Search bar */}
                  <div className="hidden md:flex relative flex-1 mx-8 max-w-xl">
                    <div className="relative w-full">
                      <Input
                        type="search"
                        placeholder="Bạn cần tìm gì?"
                        className="pl-10 pr-4 py-2 w-full rounded-full bg-white text-gray-800 border-0 focus-visible:ring-green-500"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <Button className="ml-2 bg-green-700 hover:bg-green-800 rounded-full">Tìm kiếm</Button>
                  </div>

                  {/* Right navigation */}
                  <div className="flex items-center gap-4">
                    {/* Location */}
                    <div className="hidden md:flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>Giao đến:</span>
                      <span className="font-semibold">Đà Nẵng</span>
                    </div>

                    {/* User */}
                    <Link href="/account" className="hidden md:flex items-center gap-1 text-sm">
                      <User className="h-4 w-4" />
                      <span>Tài khoản</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative">
                      <ShoppingCart className="h-6 w-6" />
                      <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-green-800 px-1.5 rounded-full text-xs">
                        0
                      </Badge>
                    </Link>
                  </div>
                </div>
              </div>

              
              <nav className="bg-green-700 py-2">
                <div className="container mx-auto px-4 flex items-center">
                  <Button variant="ghost" className="text-white hover:bg-green-600 flex items-center gap-2 font-bold">
                    <Menu className="h-5 w-5" />
                    DANH MỤC SẢN PHẨM
                  </Button>
                  <div className="hidden md:flex ml-6 gap-6 text-sm font-medium">
                    <Link href="/" className="text-white hover:text-green-200 transition duration-200">
                      Trang chủ
                    </Link>
                    <Link href="/products" className="text-white hover:text-green-200 transition duration-200">
                      Sản phẩm
                    </Link>
                    <Link href="#" className="text-white hover:text-green-200 transition duration-200">
                      Khuyến mãi
                    </Link>
                    <Link href="#" className="text-white hover:text-green-200 transition duration-200">
                      Giới thiệu
                    </Link>
                    <Link href="#" className="text-white hover:text-green-200 transition duration-200">
                      Liên hệ
                    </Link>
                  </div>

                  <div className="md:hidden ml-auto">
                    <Button variant="ghost" className="text-white hover:bg-green-600">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </nav>
            </header>
            {children}

            {/* Footer */}
            <footer className="bg-green-800 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Fresh Veggies Store</h3>
                    <p className="text-green-100">
                      Chúng tôi cung cấp rau củ quả hữu cơ tươi ngon trực tiếp từ nông trại đến bàn ăn của bạn.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/" className="text-green-100 hover:text-white">
                          Trang chủ
                        </Link>
                      </li>
                      <li>
                        <Link href="/products" className="text-green-100 hover:text-white">
                          Sản phẩm
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-green-100 hover:text-white">
                          Giới thiệu
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-green-100 hover:text-white">
                          Liên hệ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
                    <address className="not-italic text-green-100">
                      <p>24 Lê Thánh Tôn</p>
                      <p>Quận Hải Châu, Đà Nẵng</p>
                      <p className="mt-2">Email: hieuduongdinh2@gmail.com</p>
                      <p>Điện thoại: 0857856797</p>
                    </address>
                  </div>
                </div>
                <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-100">
                  <p>&copy; {new Date().getFullYear()} Fresh Veggies Store. Tất cả quyền được bảo lưu.</p>
                </div>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

