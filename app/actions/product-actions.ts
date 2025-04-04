"use server"

import dbConnect from "@/lib/db-connect"
import Product, { type IProduct } from "@/models/product"


export async function getProducts() {
  try {
    await dbConnect()
    const products = await Product.find({}).sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(products)) }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error)
    return { success: false, message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" }
  }
}

export async function getProductById(id: string) {
  try {
    await dbConnect()
    const product = await Product.findById(id)

    if (!product) {
      return { success: false, message: "Không tìm thấy sản phẩm" }
    }

    return { success: true, data: JSON.parse(JSON.stringify(product)) }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error)
    return { success: false, message: "Đã xảy ra lỗi khi lấy thông tin sản phẩm" }
  }
}

export async function createProduct(productData: Partial<IProduct>) {
  try {
    await dbConnect()
    const product = await Product.create(productData)
    return { success: true, data: JSON.parse(JSON.stringify(product)) }
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm mới:", error)
    return { success: false, message: "Đã xảy ra lỗi khi tạo sản phẩm mới" }
  }
}

export async function updateProduct(id: string, productData: Partial<IProduct>) {
  try {
    await dbConnect()
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return { success: false, message: "Không tìm thấy sản phẩm" }
    }

    return { success: true, data: JSON.parse(JSON.stringify(product)) }
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error)
    return { success: false, message: "Đã xảy ra lỗi khi cập nhật sản phẩm" }
  }
}

export async function deleteProduct(id: string) {
  try {
    await dbConnect()
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return { success: false, message: "Không tìm thấy sản phẩm" }
    }

    return { success: true, data: {} }
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error)
    return { success: false, message: "Đã xảy ra lỗi khi xóa sản phẩm" }
  }
}

