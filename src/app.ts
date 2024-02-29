import 'dotenv/config'
import express, {Application} from "express";
import { createdRoles, deletedRoles, getRoles, updatedRoles } from './controllers/roleController';
import { LoginUser, RegisterUser } from './controllers/authController';
import { deleteUserById, getUserbyEmail, getUserbyId, getUsers, updateUserRole, updateUserbyId } from './controllers/userController';


export const app: Application = express();

app.use(express.json())

app.get("/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  })
})
// register & login routes
app.post('/api/auth/register', RegisterUser);
app.post('/api/auth/login', LoginUser);

// roles routes
app.get("/roles",getRoles)
app.post("/roles",createdRoles)
app.put("/roles/:id",updatedRoles)
app.delete("/roles/:id",deletedRoles)

// users routes super_admin
app.get("/api/users",getUsers)
app.get('/api/users/:email',getUserbyEmail)
app.delete('/api/users/:id', deleteUserById);
app.put('/api/users/:id/role',updateUserRole)


// users routes
app.get('/api/users/profile/:id',getUserbyId)
app.put('/api/users/profile/:id',updateUserbyId)




//example create role json 
//{
//   "name":"admin"
// }
//example create user json
// {
//   "first_name":"Juan Roman",
//   "last_name": "Riquelme",
//   "password_hash":"la12bocqR$",
//   "email":"eltopoyiyo@bocajr.com"
// }
//example change role
// {
// "role_id": 2
// }