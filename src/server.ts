import "dotenv/config"
import { app } from "./app"
import { AppDataSource } from "./database/db"

const PORT = process.env.PORT || 4500

const startServer = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database Appointment API connected")
      app.listen(PORT, () => {
        console.log(`Server is running at PORT: ${PORT}`)
      })
    })
    .catch((error) => {
      // console.log(error)
      console.error("Failed to connect to MySQL database:", error.message)
    })
}

startServer()
