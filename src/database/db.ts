import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
// Migrations
import { Roles1708988659461 } from "./migrations/1708988659461-roles"
import { Users1709019847564 } from "./migrations/1709019847564-users"
import { Services1709019895203 } from "./migrations/1709019895203-services"
import { Appointments1709019870403 } from "./migrations/1709019870403-appointments"
// Entities
import { User } from "../models/User"
import { Role } from "../models/Role"
import { Appointment } from "../models/Appointment"
import { Service } from "../models/Service"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  entities: [Role, User, Service, Appointment],
  migrations: [
    Roles1708988659461,
    Users1709019847564,
    Services1709019895203,
    Appointments1709019870403,
  ],
  synchronize: false,
  logging: false,
})
