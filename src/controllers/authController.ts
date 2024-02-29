import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const reqMail: string = req.body.email
    const reqFirstName: string = req.body.first_name
    const reqLastName: string = req.body.last_name
    const reqPass: string = req.body.password_hash

    const regexpPass: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/

    if (
      reqPass.length < 8 ||
      !regexpPass.test(reqPass) ||
      reqPass.includes(" ")
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be shorter than 8 and without special characters, mayus, minus and/or numbers and with spaces)",
      })
    }
    const validEmail: RegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/
    if (!validEmail.test(reqMail)) {
      return res.status(400).json({
        success: false,
        message: "Email inserted not valid - Structure wrong",
      })
    }
    const cryptedPass = bcrypt.hashSync(reqPass, 8)

    const newUser = await User.create({
      firstName: reqFirstName,
      lastName: reqLastName,
      email: reqMail,
      password: cryptedPass,
      role: {
        id: 1,
      },
    }).save()

    return res.status(201).json({
      success: true,
      message: "User registered into DB successfully",
      data: newUser,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Register user failure",
      error: error,
    })
  }
}
export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, passwordBody } = req.body
    if (!email || !passwordBody) {
      return res.status(400).json({
        success: false,
        message: "Email and password are needed",
      })
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
      relations: {
        role: true,
      },
      select: {
        id: true,
        password: true,
        email: true,
        role: {
          id: true,
          title: true,
        },
      },
    })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email o password invalid",
      })
    }
    const isValidPassword = bcrypt.compareSync(passwordBody, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Email o password invalid",
      })
    }
    const token = Jwt.sign(
      {
        userId: user.id,
        roleName: user.role.title,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    )
    console.log("soy el ", user)
    console.log(token)
    return res.status(200).json({
      success: true,
      message: "User logged successfully",
      token: token,
      data: user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can't be logged",
      error: error,
    })
  }
}
