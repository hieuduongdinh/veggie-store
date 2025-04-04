import app from "./app"
import connectDB from "./configs/database"
import config from "./configs/config"

// Connect to MongoDB
connectDB().then(() => {
  // Start server only after successful database connection
  app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`)
  })
})

