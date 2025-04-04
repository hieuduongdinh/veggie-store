"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createArticle } from "@/app/actions/article-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function NewArticlePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    keyword: "",
    description: "",
    content: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createArticle(formData)

      if (result.success) {
        router.push("/admin/articles")
        router.refresh()
      } else {
        alert("Lỗi khi tạo bài viết: " + result.message)
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error)
      alert("Đã xảy ra lỗi khi tạo bài viết")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Thêm bài viết mới</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyword">Từ khóa (phân cách bằng dấu phẩy)</Label>
            <Input
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="apple, os, technology"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả ngắn</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Nội dung</Label>
            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Ngày</Label>
            <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/articles")}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang lưu..." : "Lưu bài viết"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

