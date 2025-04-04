import { NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Article from "@/models/article"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const article = await Article.findById(params.id)

    if (!article) {
      return NextResponse.json({ message: "Error", error: "Không tìm thấy bài viết" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Success",
      data: article,
    })
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bài viết:", error)
    return NextResponse.json({ message: "Error", error: "Đã xảy ra lỗi khi lấy thông tin bài viết" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const body = await request.json()
    const article = await Article.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!article) {
      return NextResponse.json({ message: "Error", error: "Không tìm thấy bài viết" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Success",
      data: article,
    })
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error)
    return NextResponse.json({ message: "Error", error: "Đã xảy ra lỗi khi cập nhật bài viết" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const article = await Article.findByIdAndDelete(params.id)

    if (!article) {
      return NextResponse.json({ message: "Error", error: "Không tìm thấy bài viết" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Success",
      data: {},
    })
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error)
    return NextResponse.json({ message: "Error", error: "Đã xảy ra lỗi khi xóa bài viết" }, { status: 500 })
  }
}

