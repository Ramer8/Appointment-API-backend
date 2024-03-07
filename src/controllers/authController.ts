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

    //Checking if exist e-mail (user) in the database
    const userDataBase = await User.findOne({
      where: {
        email: reqMail,
      },
    })
    console.log(userDataBase)
    if (userDataBase) {
      return res.status(400).json({
        success: false,
        message: "This user email is already exist in owner Data Base",
      })
    }

    //
    if (reqPass.length < 6 || reqPass.length > 10) {
      return res.status(400).json({
        success: false,
        message: "the password has to be between 6 and 10 characters",
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
        id: 1, //Problem solved, role id =2, by default now the role is 1 ,  "user" . No more is  role id =2, "admin"
      },
    }).save()
    const { password, ...rest } = newUser

    return res.status(201).json({
      success: true,
      message: "User registered into DB successfully",
      data: rest, //Solved problem "show password" , already not show password hash.
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
