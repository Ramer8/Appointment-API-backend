"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// Migrations
const _1708988659461_roles_1 = require("./migrations/1708988659461-roles");
const _1709019847564_users_1 = require("./migrations/1709019847564-users");
const _1709019870403_services_1 = require("./migrations/1709019870403-services");
const _1709019895203_appointments_1 = require("./migrations/1709019895203-appointments");
// Entities
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const Appointment_1 = require("../models/Appointment");
const Service_1 = require("../models/Service");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    entities: [Role_1.Role, User_1.User, Service_1.Service, Appointment_1.Appointment],
    migrations: [
        _1708988659461_roles_1.Roles1708988659461,
        _1709019847564_users_1.Users1709019847564,
        _1709019870403_services_1.Services1709019870403,
        _1709019895203_appointments_1.Appointments1709019895203,
    ],
    synchronize: false,
    logging: false,
});
