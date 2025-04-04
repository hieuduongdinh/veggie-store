"use server"

import dbConnect from "@/lib/db-connect"
import Article, { type IArticle } from "@/models/article"

export async function getArticles() {
  try {
    await dbConnect()
    const articles = await Article.find({}).sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(articles)) }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error)
    return { success: false, message: "Đã xảy ra lỗi khi lấy danh sách bài viết" }
  }
}

export async function getArticleById(id: string) {
  try {
    await dbConnect()
    const article = await Article.findById(id)

    if (!article) {
      return { success: false, message: "Không tìm thấy bài viết" }
    }

    return { success: true, data: JSON.parse(JSON.stringify(article)) }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bài viết:", error)
    return { success: false, message: "Đã xảy ra lỗi khi lấy thông tin bài viết" }
  }
}

export async function createArticle(articleData: Partial<IArticle>) {
  try {
    await dbConnect()
    const article = await Article.create(articleData)
    return { success: true, data: JSON.parse(JSON.stringify(article)) }
  } catch (error) {
    console.error("Lỗi khi tạo bài viết mới:", error)
    return { success: false, message: "Đã xảy ra lỗi khi tạo bài viết mới" }
  }
}

export async function updateArticle(id: string, articleData: Partial<IArticle>) {
  try {
    await dbConnect()
    const article = await Article.findByIdAndUpdate(id, articleData, {
      new: true,
      runValidators: true,
    })

    if (!article) {
      return { success: false, message: "Không tìm thấy bài viết" }
    }

    return { success: true, data: JSON.parse(JSON.stringify(article)) }
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error)
    return { success: false, message: "Đã xảy ra lỗi khi cập nhật bài viết" }
  }
}

export async function deleteArticle(id: string) {
  try {
    await dbConnect()
    const article = await Article.findByIdAndDelete(id)

    if (!article) {
      return { success: false, message: "Không tìm thấy bài viết" }
    }

    return { success: true, data: {} }
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error)
    return { success: false, message: "Đã xảy ra lỗi khi xóa bài viết" }
  }
}

