import dotenv from "dotenv"

dotenv.config()

export default {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/veggie-store",
  jwtSecret: process.env.JWT_SECRET || "secret",
  jwtExpire: process.env.JWT_EXPIRE || "30d",
}

