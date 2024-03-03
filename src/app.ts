import "dotenv/config"
import express, { Application } from "express"
import {
  createdRoles,
  deletedRoles,
  getRoles,
  updatedRoles,
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
  getAllAppointmentsSuper_admin,
  retrieveAppointmentWithId,
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
app.get("/roles", getRoles)
app.post("/roles", createdRoles)
app.put("/roles/:id", updatedRoles)
app.delete("/roles/:id", deletedRoles)

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
app.put("/api/appointments", auth, updateMyAppointmentWithToken) // (con token)
app.put("/api/appointments/:id", retrieveAppointmentWithId) // ready
app.get("/api/appointments", auth, showMyAppointmentsWithToken) // (con token)
app.get(
  "/api/appointments/all",
  auth,
  isSuperAdmin,
  getAllAppointmentsSuper_admin
)
// (con token y supeAdmin) ready

//example create role json
//{
//   "name":"admin"
// }
//example create user json
// {
//   "first_name":"Juan Roman",
//   "last_name": "Riquelme",
// "password_hash":"la12bocqR$",
// "email":"eltopoyiyo@bocajr.com"
// }
//example change role
// {
// "role_id": 2
// }
//example string token on http://localhost:4500/api/users
// In Auth, Bearer put this recent created token string
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOj
// EsInJvbGVOYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDkyMjEzMTYsImV4
// cCI6MTcwOTIyODUxNn0.622sPBXaBaI-I_929gP2MHuN21Gql-SUxen6HDp1eWg
//Contiene el userID,

//Example service
// {
//   "name":"Full arm tatoo",
//   "description":"arm fully covered from shoulder to hand"
// }

// //Example login
// {
//     "passwordBody":"la12bocqR$",
//   "email":"eltopoyiyo@bocajr.com"
// }
