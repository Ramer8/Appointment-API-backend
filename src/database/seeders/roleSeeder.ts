import { Role } from "../../models/Role"
import { AppDataSource } from "../db"

const roleSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    const roleUser = new Role()
    roleUser.title = "user"
    roleUser.id = 1
    await roleUser.save()

    const roleAdmin = new Role()
    roleAdmin.title = "admin"
    roleAdmin.id = 2

    await roleAdmin.save()

    const roleSuperAdmin = new Role()
    roleSuperAdmin.title = "super_admin"
    roleSuperAdmin.id = 3

    await roleSuperAdmin.save()

    console.log("---------------------------")
    console.log("Roles saved successfully")
    console.log("---------------------------")
  } catch (error) {
    console.log(error)
  } finally {
    await AppDataSource.destroy()
  }
}

const seed = async () => {}

roleSeedDatabase()
