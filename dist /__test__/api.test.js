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
const supertest_1 = __importDefault(require("supertest"));
const db_1 = require("../database/db");
const app_1 = require("../app");
// import { Server } from 'http'
let server;
let token = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.AppDataSource.initialize();
    server = app_1.app.listen(4001);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (server) {
            yield server.close();
            console.log("Server closed");
        }
        yield db_1.AppDataSource.destroy();
    }
    catch (error) {
        console.error("Error closing server and destroying database connection:", error);
        throw error;
    }
}));
// describe("Api auth", () => {
//   test("register user", async () => {
//     const { status, body } = await request(server)
//       .post("/api/auth/register")
//       .send({
//         firstName: "Marina",
//         lastName: "lopario",
//         email: "fdfcom@comer.com",
//         password: "12345678",
//         role: {
//           id: 1,
//         },
//       })
//     expect(status).toBe(201)
//   })
// })
// to do the diferent error examples
describe("Api healthy", () => {
    test("server is healthy", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server).get("/healthy");
        expect(status).toBe(200);
    }));
});
//Api is healthy?
describe("Api auth", () => {
    test("register user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .post("/api/auth/register")
            .send({
            firstName: "Marina",
            lastName: "Lopez",
            email: "comanselo@comer.com",
            password: "12345678",
            role: {
                id: 1,
            },
        });
        expect(status).toBe(201);
    }));
});
//login
describe("Api auth", () => {
    test("login user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .post("/api/auth/login")
            .send({
            email: "comanselo@comer.com",
            passwordBody: "12345678",
        });
        token = body.token;
        expect(status).toBe(200);
    }));
});
//api/profile/users
describe("Api auth", () => {
    test("Update user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .put("/api/users/profile")
            //  .put(`/api/profile/l${userId}`)
            .send({
            first_name: "Maria",
            last_name: "Juarez",
        })
            .set(`Authorization`, `Bearer ${token}`);
        expect(status).toBe(200);
    }));
});
