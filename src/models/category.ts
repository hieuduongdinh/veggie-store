import mongoose, { Schema, type Document } from "mongoose"

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true },
)

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)

