import mongoose, { Schema, type Document } from "mongoose"

export interface IArticle extends Document {
  title: string
  keyword: string
  description: string
  content: string
  date: string
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    keyword: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema)

