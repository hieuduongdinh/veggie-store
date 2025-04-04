import Link from "next/link"
import { getArticleById } from "@/app/actions/article-actions"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const { success, data: article, message } = await getArticleById(params.id)

  if (!success) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-10">
          <div className="text-xl font-semibold text-gray-500">Không tìm thấy bài viết</div>
          <p className="text-gray-400 mt-2">{message}</p>
          <Link href="/articles" className="mt-4 inline-block">
            <Button variant="outline">Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/articles">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách
          </Button>
        </Link>
      </div>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {article.keyword.split(",").map((keyword: string, index: number) => (
              <Badge key={index} variant="secondary">
                {keyword.trim()}
              </Badge>
            ))}

          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">{article.description}</p>
          </div>
        </header>

        <Separator className="my-6" />

        <div className="prose max-w-none">
          {article.content.split("\n").map((paragraph:number, index:number) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}

