import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Roles1708988659461 } from "./migrations/1708988659461-roles"

export const AppDataSource = new DataSource({
    type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  entities: [],
  migrations:[Roles1708988659461],
  synchronize: false,
  logging: false,
})