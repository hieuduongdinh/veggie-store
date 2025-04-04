import { NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Product from "@/models/product"

export async function GET() {
  try {
    await dbConnect()

    const products = await Product.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: products,
    })
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error)
    return NextResponse.json({ success: false, message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()

    const body = await request.json()
    const product = await Product.create(body)

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm mới:", error)
    return NextResponse.json({ success: false, message: "Đã xảy ra lỗi khi tạo sản phẩm mới" }, { status: 500 })
  }
}

