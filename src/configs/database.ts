import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/veggie-store")
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    process.exit(1)
  }
}

export default connectDB

