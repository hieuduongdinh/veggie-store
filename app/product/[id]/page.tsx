"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  _id: string
  name: string
  category: string
  description: string
  price: number
  stock: number
  image: string
  rating?: number
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [quantity, setQuantity] = useState<number>(1)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)

        const sampleProducts = [
          {
            _id: "1",
            name: "Cà chua hữu cơ",
            category: "Rau củ",
            description: "Cà chua hữu cơ tươi ngon từ nông trại",
            price: 25000,
            stock: 50,
            image: "",
          },
          {
            _id: "2",
            name: "Bắp cải xanh",
            category: "Rau củ",
            description: "Bắp cải xanh tươi ngon, không thuốc trừ sâu",
            price: 18000,
            stock: 40,
            image: "",
          },
          {
            _id: "3",
            name: "Táo Fuji",
            category: "Trái cây",
            description: "Táo Fuji nhập khẩu từ Nhật Bản",
            price: 60000,
            stock: 30,
            image: "",
          },
        ]

        const id = params?.id as string
        const foundProduct = sampleProducts.find((p) => p._id === id)

        if (foundProduct) {
          setProduct(foundProduct)

          const related = sampleProducts.filter((p) => p.category === foundProduct.category && p._id !== id).slice(0, 4)
          setRelatedProducts(related)
        } else {
          setError("Không tìm thấy sản phẩm")
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Đã xảy ra lỗi khi tải thông tin sản phẩm")
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params])

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || "Không tìm thấy sản phẩm"}</h2>
        <Button onClick={() => router.push("/products")}>Quay lại trang sản phẩm</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/products")}>
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách sản phẩm
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=600"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <Badge className="mb-2">{product.category}</Badge>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-green-700 mb-4">{formatPrice(product.price)}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2"> Tình trạng:
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? " Còn hàng" : " Hết hàng"}
              </span>
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="border rounded-lg overflow-hidden cursor-pointer"
                onClick={() => router.push(`/product/${relatedProduct._id}`)}
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg?height=160&width=240"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{relatedProduct.name}</h3>
                  <p className="text-green-700 font-bold mt-1">{formatPrice(relatedProduct.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

