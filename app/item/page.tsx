"use client"
import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  category: string
  description: string
  price: number
  stock: number
  image: string
  rating: number
  discount?: number
}

// Dữ liệu mẫu
const sampleProducts: Product[] = [
  {
    _id: "1",
    name: "Cà chua hữu cơ",
    category: "Rau củ",
    description: "Cà chua hữu cơ tươi ngon từ nông trại",
    price: 25000,
    stock: 50,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
  },
  {
    _id: "2",
    name: "Bắp cải xanh",
    category: "Rau củ",
    description: "Bắp cải xanh tươi ngon, không thuốc trừ sâu",
    price: 18000,
    stock: 40,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    discount: 10,
  },
  {
    _id: "3",
    name: "Táo Fuji",
    category: "Trái cây",
    description: "Táo Fuji nhập khẩu từ Nhật Bản",
    price: 60000,
    stock: 30,
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
  },
  {
    _id: "4",
    name: "Chuối sứ",
    category: "Trái cây",
    description: "Chuối sứ hữu cơ từ Đà Lạt",
    price: 35000,
    stock: 45,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
  },
]

export default function SanPhamPage() {
  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Hiển thị số sao đánh giá - Đã thêm kiểu dữ liệu cho tham số rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Sản Phẩm Của Chúng Tôi</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <Card key={product._id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardContent className="pt-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <div className="text-sm text-gray-500 mb-2">{product.category}</div>
              <div className="mb-2">{renderStars(product.rating)}</div>
              <div className="text-lg font-bold text-green-700">{formatPrice(product.price)}</div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Thêm vào giỏ
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

