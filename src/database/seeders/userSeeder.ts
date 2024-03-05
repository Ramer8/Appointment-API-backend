import { Role } from "../../models/Role"
import { User } from "../../models/User"
import { AppDataSource } from "../db"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

//number of fake users we want to populate DB with
let num_users = 20
let fakeName
// create false users to populate DB (with Faker)
const generateFakeUsers = () => {
  const user = new User()
  fakeName = faker.person.firstName()
  user.firstName = faker.person.firstName()
  user.lastName = faker.person.lastName()
  user.email = faker.internet.email()
  // Hardcode a hashed password
  // user.password = "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
  // user.password = bcrypt.hashSync(`123456`,8)
  user.password = bcrypt.hashSync(`${fakeName}`, 8)
  user.role = new Role()
  user.role.id = 1
  return user
}

const userSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    // Hardcoded superadmin
    const superadmin = new User()
    superadmin.firstName = "Super"
    superadmin.lastName = "Super"
    superadmin.email = "super@super.com"
    superadmin.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    superadmin.role = new Role()
    superadmin.role.id = 3
    superadmin.save()

    // Hardcoded admin
    const admin = new User()
    admin.firstName = "Admin"
    admin.lastName = "Admin"
    admin.email = "admin@admin.com"
    admin.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    admin.role = new Role()
    admin.role.id = 2
    admin.save()

    // Fake users (with role_id = 1 by default)
    const fakeUsers = Array.from({ length: num_users - 2 }, generateFakeUsers)
    await User.save(fakeUsers)

    console.log("Users saved correctly")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

userSeedDatabase()
