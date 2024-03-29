import "dotenv/config"
import express, { Application } from "express"
import cors from "cors"

import {
  createRoles,
  deleteRoles,
  getRoles,
  updateRoles,
} from "./controllers/roleController"
import { LoginUser, RegisterUser } from "./controllers/authController"
import {
  deleteUserById,
  getUserByEmailQueryFilters,
  getUserProfile,
  getUsers,
  updateUserProfile,
  updateUserRole,
} from "./controllers/userController"
import { auth } from "./middlewares/auth"
import { isSuperAdmin } from "./middlewares/isSuperAdmin"
import {
  createAppointmentWithToken,
  deleteAppointmentById,
  getAllAppointmentsSuper_admin,
  recoverAppointmentWithId,
  showMyAppointmentsWithToken,
  updateMyAppointmentWithToken,
} from "./controllers/appointmentController"
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "./controllers/serviceControllers"

export const app: Application = express()

app.use(cors())

app.use(express.json())

app.get("/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  })
})
// register & login routes
app.post("/api/auth/register", RegisterUser)
app.post("/api/auth/login", LoginUser)

// roles routes
app.get("/roles", auth, isSuperAdmin, getRoles)
app.post("/roles", auth, isSuperAdmin, createRoles)
app.put("/roles/:id", auth, isSuperAdmin, updateRoles)
app.delete("/roles/:id", auth, isSuperAdmin, deleteRoles)

// users routes super_admin
app.get("/api/users?", auth, isSuperAdmin, getUserByEmailQueryFilters) //ready
app.get("/api/users", auth, isSuperAdmin, getUsers) //ready
app.delete("/api/users/:id", auth, isSuperAdmin, deleteUserById)
app.put("/api/users/:id/role", auth, isSuperAdmin, updateUserRole)

// users routes
app.get("/api/users/profile", auth, getUserProfile) //ready
app.put("/api/users/profile", auth, updateUserProfile) //ready

// Service routes
app.post("/api/services", auth, isSuperAdmin, createService) //ready
app.get("/api/services", getServices) // ready
app.put("/api/services/:id", auth, isSuperAdmin, updateService)
app.delete("/api/services/:id", auth, isSuperAdmin, deleteService)

// Appointment routes
app.post("/api/appointments", auth, createAppointmentWithToken) // (con token) ready
app.put("/api/appointments", auth, updateMyAppointmentWithToken) //& appointment ID // (con token)
app.put("/api/appointments/:id", auth, recoverAppointmentWithId) // ready
app.delete("/api/appointments/:id", auth, deleteAppointmentById) // ready
app.get("/api/appointments", auth, showMyAppointmentsWithToken) //my appoinments (con token)
app.get(
  "/api/appointments/all",
  auth,
  isSuperAdmin,
  getAllAppointmentsSuper_admin
) // (with token & supeAdmin) ready
