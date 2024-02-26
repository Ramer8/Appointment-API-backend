import 'dotenv/config'
import express, {Application} from "express";


export const app: Application = express();

app.use(express.json())

app.get("/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  })
})