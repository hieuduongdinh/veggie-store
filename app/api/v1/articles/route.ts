import { NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Article from "@/models/article"

export async function GET() {
  try {
    await dbConnect()

    const articles = await Article.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      message: "Success",
      data: articles,
    })
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error)
    return NextResponse.json({ message: "Error", error: "Đã xảy ra lỗi khi lấy danh sách bài viết" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()

    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "keyword", "description", "content", "date"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ message: "Error", error: `Trường ${field} là bắt buộc` }, { status: 400 })
      }
    }

    const article = await Article.create(body)

    return NextResponse.json(
      {
        message: "Success",
        data: article,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Lỗi khi tạo bài viết mới:", error)
    return NextResponse.json({ message: "Error", error: "Đã xảy ra lỗi khi tạo bài viết mới" }, { status: 500 })
  }
}

