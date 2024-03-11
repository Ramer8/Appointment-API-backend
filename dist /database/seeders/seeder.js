"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("../../models/Role");
const db_1 = require("../db");
const User_1 = require("../../models/User");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Service_1 = require("../../models/Service");
const Appointment_1 = require("../../models/Appointment");
const roleSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const roleUser = new Role_1.Role();
        roleUser.title = "user";
        yield roleUser.save();
        roleUser.id = 1;
        const roleAdmin = new Role_1.Role();
        roleAdmin.title = "admin";
        roleUser.id = 2;
        yield roleAdmin.save();
        const roleSuperAdmin = new Role_1.Role();
        roleSuperAdmin.title = "super_admin";
        roleUser.id = 3;
        yield roleSuperAdmin.save();
        console.log("----------------------------");
        console.log("--Roles saved successfully--");
        console.log("----------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
//number of fake users we want to populate DB with
let num_users = 20;
let fakeName;
// create false users to populate DB (with Faker)
const generateFakeUsers = () => {
    const user = new User_1.User();
    fakeName = faker_1.faker.person.firstName();
    user.firstName = faker_1.faker.person.firstName();
    user.lastName = faker_1.faker.person.lastName();
    user.email = faker_1.faker.internet.email();
    // Hardcode a hashed password
    // user.password = "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    user.password = bcrypt_1.default.hashSync(`123456`, 8);
    // user.password = bcrypt.hashSync(`${fakeName}`, 8)
    user.role = new Role_1.Role();
    user.role.id = 1;
    return user;
};
const userSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        // Hardcoded superadmin
        const superadmin = new User_1.User();
        superadmin.firstName = "Super";
        superadmin.lastName = "Super";
        superadmin.email = "super@super.com";
        superadmin.password =
            "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO"; // 123456
        superadmin.role = new Role_1.Role();
        superadmin.role.id = 3;
        superadmin.save();
        // Hardcoded admin
        const admin = new User_1.User();
        admin.firstName = "Admin";
        admin.lastName = "Admin";
        admin.email = "admin@admin.com";
        admin.password =
            "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO"; // 123456
        admin.role = new Role_1.Role();
        admin.role.id = 2;
        admin.save();
        // Fake users (with role_id = 1 by default)
        const fakeUsers = Array.from({ length: num_users - 2 }, generateFakeUsers);
        yield User_1.User.save(fakeUsers);
        console.log("---------------------------");
        console.log("---Users saved correctly---");
        console.log("---------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (db_1.AppDataSource) {
            yield db_1.AppDataSource.destroy();
        }
    }
});
// Create services (5 hardcoded examples)
const serviceSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const service1 = new Service_1.Service();
        service1.serviceName = "Custom tatoo";
        service1.description =
            "Customer can bring his design and we ink it on his body";
        service1.id = 1;
        yield service1.save();
        const service2 = new Service_1.Service();
        service2.serviceName = "Web catalog tatoo";
        service2.description =
            "We have severals desingn on predefined designs in our catalog.";
        service2.id = 2;
        yield service2.save();
        const service3 = new Service_1.Service();
        service3.serviceName = "Old tattoo restoration";
        service3.description = "We can fix old blur tattos";
        service3.id = 3;
        yield service3.save();
        const service4 = new Service_1.Service();
        service4.serviceName = "Piercing and dilator insertion";
        service4.description =
            "We offer professional services for piercing and dilator placement";
        service4.id = 4;
        yield service4.save();
        const service5 = new Service_1.Service();
        service5.serviceName = "Sale of piercings and other articles";
        service5.description =
            "In addition to our application services, we offer a selection of piercings and other body art related items. Customers can purchase quality products to complement their unique style.";
        service5.id = 5;
        yield service5.save();
        console.log("----------------------------");
        console.log("--Services saved correctly--");
        console.log("----------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (db_1.AppDataSource) {
            yield db_1.AppDataSource.destroy();
        }
    }
});
// Variables (double check number of users and services)
// Number of fake users and appointments we want to populate DB with
// Roles and services are hardcoded
// Hardcoded seed - in case of adding more services, this need to be changed by hand to adjust "generateFakeAppointments" in seeder)
let num_services = 5;
let num_appointments = 100;
// Create appointments (choosing random number in the range of the users and services variables declared above)
const generateFakeAppointments = () => {
    const appointment = new Appointment_1.Appointment();
    appointment.appointmentDate = faker_1.faker.date.future();
    let randomUser = Math.floor(Math.random() * num_users + 1);
    appointment.userId = randomUser;
    let randomService = Math.floor(Math.random() * num_services + 1);
    appointment.serviceId = randomService;
    return appointment;
};
const appointmentSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const fakeAppointments = Array.from({ length: num_appointments }, generateFakeAppointments);
        yield Appointment_1.Appointment.save(fakeAppointments);
        console.log("------------------------------");
        console.log("-Appointments saved correctly-");
        console.log("------------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (db_1.AppDataSource) {
            yield db_1.AppDataSource.destroy();
        }
    }
});
const startSeeders = () => __awaiter(void 0, void 0, void 0, function* () {
    yield roleSeedDatabase();
    yield userSeedDatabase();
    yield serviceSeedDatabase();
    yield appointmentSeedDatabase();
});
startSeeders();
