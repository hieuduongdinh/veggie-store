"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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


const sampleProducts: Product[] = [
  {
    _id: "1",
    name: "Củ Gừng Tươi",
    category: "Củ Quả",
    description: "Gừng Đà Lạt",
    price: 25000,
    stock: 50,
    image: "./item1.png",
    rating: 4.5,
    discount: 25,
  },
  {
    _id: "2",
    name: "Bắp cải xanh",
    category: "Rau củ",
    description: "Bắp cải xanh tươi ngon, không thuốc trừ sâu",
    price: 18000,
    stock: 40,
    image: "./bapcai.png",
    rating: 4.2,
    discount: 35,
  },
  {
    _id: "3",
    name: "Táo Fuji",
    category: "Trái cây",
    description: "Táo Fuji nhập khẩu từ Nhật Bản",
    price: 60000,
    stock: 30,
    image: "./fuji.png",
    rating: 5,
    discount: 5,
  },
  {
    _id: "4",
    name: "Chuối sứ",
    category: "Trái cây",
    description: "Chuối sứ hữu cơ từ Đà Lạt",
    price: 35000,
    stock: 45,
    image: "./chuoisu.png",
    rating: 4.7,
    discount: 17,
  },
  {
    _id: "5",
    name: "Khoai tây",
    category: "Củ quả",
    description: "Khoai tây tươi ngon từ Đà Lạt",
    price: 22000,
    stock: 60,
    image: "",
    rating: 4.3,
    discount: 15,
  },
  {
    _id: "6",
    name: "Cà rốt",
    category: "Củ quả",
    description: "Cà rốt hữu cơ giàu vitamin A",
    price: 20000,
    stock: 55,
    image: "",
    rating: 4.4,
  },
  {
    _id: "7",
    name: "Xà lách",
    category: "Rau lá",
    description: "Xà lách tươi mát, trồng thủy canh",
    price: 15000,
    stock: 70,
    image: "",
    rating: 4.1,
  },
  {
    _id: "8",
    name: "Dưa hấu",
    category: "Trái cây",
    description: "Dưa hấu ngọt mát từ miền Tây",
    price: 40000,
    stock: 25,
    image: "",
    rating: 4.2,
    discount: 20,
  },
  {
    _id: "9",
    name: "Rau Mồng Tơi",
    category: "Rau lá",
    description: "Dưa hấu ngọt mát từ miền Tây",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "10",
    name: "Chuối Cau",
    category: "Trái cây",
    description: "Dưa hấu ngọt mát từ miền Tây",
    price: 55000,
    stock: 25,
    image: "",
    rating: 4.1,
    discount: 20,
  },
  {
    _id: "11",
    name: "Rau Dền",
    category: "Rau lá",
    description: "Rau Dền Tươi ",
    price: 10000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 35,
  },
  {
    _id: "12",
    name: "Rau Hành",
    category: "Rau lá",
    description: "Hành Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "13",
    name: "Rau Mồng Tơi",
    category: "Rau lá",
    description: "Rau Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "14",
    name: "Rau Xà Lách Xoong",
    category: "Rau lá",
    description: "Rau Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "15",
    name: "Rau Ngò",
    category: "Rau lá",
    description: "Rau Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "16",
    name: "Rau Cải Ngọt",
    category: "Rau lá",
    description: "Rau Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "17",
    name: "Rau Cải Thìa",
    category: "Rau lá",
    description: "Rau Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "18",
    name: "Rau Hẹ",
    category: "Rau lá",
    description: "Rau Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "19",
    name: "Rau Ngò Gai",
    category: "Rau lá",
    description: "Rau Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
  {
    _id: "20",
    name: "Củ Cải Trắng",
    category: "Củ Qủa",
    description: "Rau  Củ Tươi Đà Lạt",
    price: 15000,
    stock: 25,
    image: "",
    rating: 4.6,
    discount: 20,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortOption, setSortOption] = useState<string>("default")
  const [loading, setLoading] = useState<boolean>(false)

  
  const categories = Array.from(new Set(products.map((product) => product.category)))

  useEffect(() => {
    setLoading(true)

    let result = [...products]
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    setFilteredProducts(result)
    setLoading(false)
  }, [selectedCategory, sortOption, products])

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />)
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

 
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Sản Phẩm Của Chúng Tôi</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`cursor-pointer ${selectedCategory === "all" ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setSelectedCategory("all")}
          >
            Tất cả
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer ${selectedCategory === category ? "bg-green-600" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sắp xếp theo:</span>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mặc định" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Mặc định</SelectItem>
              <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
              <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
              <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
              <SelectItem value="name">Tên sản phẩm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải sản phẩm...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <CardContent className="pt-4 flex-grow">
                <Link href={`/product/${product._id}`} className="hover:text-green-700">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                </Link>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <div className="mb-2">{renderStars(product.rating)}</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-700">
                    {formatPrice(product.discount ? product.price * (1 - product.discount / 100) : product.price)}
                  </span>
                  {product.discount && (
                    <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                  )}
                </div>
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
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Không tìm thấy sản phẩm nào phù hợp.</p>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Trước</Button>
          <Button variant="outline" size="sm" className="bg-green-600 text-white">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Sau</Button>
        </div>
      </div>
    </div>
  )
}

