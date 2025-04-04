import mongoose, { Schema, type Document } from "mongoose"

interface OrderItem {
  product: mongoose.Types.ObjectId
  name: string
  quantity: number
  price: number
  image: string
}

export interface IOrder extends Document {
  user: string
  orderItems: OrderItem[]
  shippingAddress: {
    fullName: string
    address: string
    city: string
    phone: string
  }
  paymentMethod: string
  totalPrice: number
  isPaid: boolean
  paidAt?: Date
  isDelivered: boolean
  deliveredAt?: Date
  createdAt: Date
  updatedAt: Date
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: String, required: true },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
)

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)

