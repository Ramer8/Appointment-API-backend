import request from "supertest"
import { AppDataSource } from "../database/db"
import { app } from "../app"
// import { Server } from 'http'

let server: any
let token = ""
beforeAll(async () => {
  await AppDataSource.initialize()

  server = app.listen(4001)
})

afterAll(async () => {
  try {
    if (server) {
      await server.close()
      console.log("Server closed")
    }

    await AppDataSource.destroy()
  } catch (error) {
    console.error(
      "Error closing server and destroying database connection:",
      error
    )
    throw error
  }
})

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
  test("server is healthy", async () => {
    const { status, body } = await request(server).get("/healthy")

    expect(status).toBe(200)
  })
})
//Api is healthy?
//When do the test change email because this is
//al ready created in DB
describe("Api auth", () => {
  test("register user", async () => {
    const { status, body } = await request(server)
      .post("/api/auth/register")
      .send({
        firstName: "Marina",
        lastName: "Lopez",
        email: "comanselo@comer.com",
        password: "12345678",
        role: {
          id: 1,
        },
      })
    expect(status).toBe(201)
  })
})

//login
describe("Api auth", () => {
  test("login user", async () => {
    const { status, body } = await request(server)
      .post("/api/auth/login")
      .send({
        email: "comanselo@comer.com",
        passwordBody: "12345678",
      })
    token = body.token
    expect(status).toBe(200)
  })
})

//api/profile/users
describe("Api auth", () => {
  test("Update user", async () => {
    const { status, body } = await request(server)
      .put("/api/users/profile")
      //  .put(`/api/profile/l${userId}`)
      .send({
        first_name: "Maria",
        last_name: "Juarez",
      })

      .set(`Authorization`, `Bearer ${token}`)

    expect(status).toBe(200)
  })
})
