"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  _id: string
  name: string
  category: string
  description: string
  price: number
  stock: number
  image: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [categories, setCategories] = useState<string[]>([])


  const sampleProducts = [
    {
      _id: "1",
      name: "Củ Gừng",
      category: "Rau Củ",
      description: "Gừng tươi hữu cơ, giàu dưỡng chất",
      price: 25000,
      stock: 50,
      image: "gung.png",
      discount: 15,
    },
    {
      _id: "2",
      name: "Hành Tím Củ",
      category: "Rau Củ",
      description: "Hành tím tươi ngon, hương vị đậm đà",
      price: 30000,
      stock: 40,
      image: "item2.png",
      discount: 35,
    },
    {
      _id: "3",
      name: "Củ Nghệ",
      category: "Rau Củ",
      description: "Củ nghệ tươi, giàu chất chống oxy hóa",
      price: 22000,
      stock: 35,
      image: "nghe.png",
      discount: 5,
    },
    {
      _id: "4",
      name: "Củ Cải Đỏ",
      category: "Rau Củ",
      description: "Củ cải đỏ tươi ngon, giàu vitamin",
      price: 28000,
      stock: 45,
      image: "item4.png",
      discount: 12,
    },
    {
      _id: "5",
      name: "Cà Rốt Baby",
      category: "Rau Củ",
      description: "Cà rốt baby tươi ngon, ngọt, giòn",
      price: 35000,
      stock: 30,
      image: "carot.png", 
      discount: 25,
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/products")
        const data = await response.json()
        
        
        const combinedProducts = [...data.data, ...sampleProducts]
        setProducts(combinedProducts)

       
        const uniqueCategories = Array.from(
          new Set(combinedProducts.map((product: Product) => product.category))
        )
        setCategories(uniqueCategories as string[])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        
        setProducts(sampleProducts)
        setCategories(Array.from(new Set(sampleProducts.map(product => product.category))))
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-700">Rau Củ Quả Tươi</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Giỏ Hàng (0)</span>
          </Button>
        </div>
      </header>

      {/* Full-width banner section */}
      <div className="w-full relative h-[400px]">
        <Image src="/thumbnail.png"alt="Rau Hữu Cơ Tươi Banner"fill className="object-cover"priority />
      </div>

      {/* Sliding text banner */}
<div className="bg-green-600 text-white py-3 overflow-hidden"> 
  <div className="animate-marquee whitespace-nowrap">
    <span className="text-lg font-medium mx-4">Mua Hàng Dễ Dàng</span>
    <span className="text-lg font-medium mx-4">Thanh Toán Linh Hoạt</span>
    <span className="text-lg font-medium mx-4">Nhận Hàng Liền Tay</span>
    <span className="text-lg font-medium mx-4">Mua Hàng Dễ Dàng</span>
    <span className="text-lg font-medium mx-4">Thanh Toán Linh Hoạt</span>
    <span className="text-lg font-medium mx-4">Nhận Hàng Tận Tay</span>
  </div>
</div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-green-600 text-white py-2 px-4 mb-6 rounded-tl-lg rounded-br-lg inline-block">
          <h2 className="text-xl font-semibold">Các Loại Rau Củ Tươi Ngon 100% Organic</h2>
        </div>

        {loading ? (
          <div className="text-center py-10">Đang Tải...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden bg-white">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image || "./chuoisu.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-center text-green-800 mb-2">
                    Rau Sạch - {product.name.toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Giao rau tận nhà nội thành TP Đà Nẵng. Ngoài ra Chúng tôi hiện đang.....
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-red-600">{product.price.toLocaleString('vi-VN')} vnđ</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Thanh Toán
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="bg-green-50 p-6 rounded-lg mb-8 container mx-auto">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Bạn cần mặt hàng gì ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-2xl">🌱</span>
            </div>
            <h3 className="font-semibold mb-2">100% Organic</h3>
            <p className="text-sm text-gray-600">Tất cả các loại rau của chúng tôi đều được trồng bằng phương pháp canh tác hữu cơ.</p>
          </div>
          <div className="text-center p-4">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-2xl">🚚</span>
            </div>
            <h1 className="font-semibold mb-2">Giao Hàng Miễn Phí</h1>
            <p className="text-sm text-gray-600">Giao Hàng Miễn Phí Cho Tất Cả Đơn Hàng Tên 300k</p>
          </div>
          <div className="text-center p-4">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-2xl">⏱️</span>
            </div>
            <h2 className="font-semibold mb-2">Thu hoạch tươi</h2>
            <p className="text-sm text-gray-600">Rau của chúng tôi được thu hoạch hàng ngày để đạt độ tươi ngon tối đa.</p>
          </div>
        </div>
      </section>
    </div>
  )
}