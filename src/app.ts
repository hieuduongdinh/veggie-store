import express, { type Application } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import v1Routes from "./routes/v1"
import { errorHandler, notFound } from "./middleware/error.middleware"
import config from "./configs/config"

const app: Application = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(compression())

// Logging
if (config.nodeEnv === "development") {
  app.use(morgan("dev"))
}

// Routes
app.use("/api/v1", v1Routes)

// Error handling
app.use(notFound)
app.use(errorHandler)

export default app

