"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const roleController_1 = require("./controllers/roleController");
const authController_1 = require("./controllers/authController");
const userController_1 = require("./controllers/userController");
const auth_1 = require("./middlewares/auth");
const isSuperAdmin_1 = require("./middlewares/isSuperAdmin");
const appointmentController_1 = require("./controllers/appointmentController");
const serviceControllers_1 = require("./controllers/serviceControllers");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.get("/healthy", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});
// register & login routes
exports.app.post("/api/auth/register", authController_1.RegisterUser);
exports.app.post("/api/auth/login", authController_1.LoginUser);
// roles routes
exports.app.get("/roles", auth_1.auth, isSuperAdmin_1.isSuperAdmin, roleController_1.getRoles);
exports.app.post("/roles", auth_1.auth, isSuperAdmin_1.isSuperAdmin, roleController_1.createRoles);
exports.app.put("/roles/:id", auth_1.auth, isSuperAdmin_1.isSuperAdmin, roleController_1.updateRoles);
exports.app.delete("/roles/:id", auth_1.auth, isSuperAdmin_1.isSuperAdmin, roleController_1.deleteRoles);
// users routes super_admin
exports.app.get("/api/users?", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.getUserByEmailQueryFilters); //ready
exports.app.get("/api/users", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.getUsers); //ready
exports.app.delete("/api/users/:id", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.deleteUserById);
exports.app.put("/api/users/:id/role", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.updateUserRole);
// users routes
exports.app.get("/api/users/profile", auth_1.auth, userController_1.getUserProfile); //ready
exports.app.put("/api/users/profile", auth_1.auth, userController_1.updateUserProfile); //ready
// Service routes
exports.app.post("/api/services", auth_1.auth, isSuperAdmin_1.isSuperAdmin, serviceControllers_1.createService); //ready
exports.app.get("/api/services", serviceControllers_1.getServices); // ready
exports.app.put("/api/services/:id", auth_1.auth, isSuperAdmin_1.isSuperAdmin, serviceControllers_1.updateService);
exports.app.delete("/api/services/:id", auth_1.auth, isSuperAdmin_1.isSuperAdmin, serviceControllers_1.deleteService);
// Appointment routes
exports.app.post("/api/appointments", auth_1.auth, appointmentController_1.createAppointmentWithToken); // (con token) ready
exports.app.put("/api/appointments", auth_1.auth, appointmentController_1.updateMyAppointmentWithToken); //& appointment ID // (con token)
exports.app.put("/api/appointments/:id", auth_1.auth, appointmentController_1.recoverAppointmentWithId); // ready
exports.app.get("/api/appointments", auth_1.auth, appointmentController_1.showMyAppointmentsWithToken); //my appoinments (con token)
exports.app.get("/api/appointments/all", auth_1.auth, isSuperAdmin_1.isSuperAdmin, appointmentController_1.getAllAppointmentsSuper_admin); // (with token & supeAdmin) ready
