import mongoose, { Schema, type Document } from "mongoose"

export interface IProduct extends Document {
  name: string
  category: string
  description: string
  price: number
  stock: number
  image: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

