import { NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Product from "@/models/product"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const product = await Product.findById(params.id)

    if (!product) {
      return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error)
    return NextResponse.json({ success: false, message: "Đã xảy ra lỗi khi lấy thông tin sản phẩm" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const body = await request.json()
    const product = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error)
    return NextResponse.json({ success: false, message: "Đã xảy ra lỗi khi cập nhật sản phẩm" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error)
    return NextResponse.json({ success: false, message: "Đã xảy ra lỗi khi xóa sản phẩm" }, { status: 500 })
  }
}

