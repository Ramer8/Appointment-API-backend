import { Request, Response } from "express";
import { User } from "../models/User"
import bcrypt from "bcrypt";

export const RegisterUser = async (req : Request, res : Response) => {
    try {
        const reqMail : string = req.body.email;
        const reqFirstName : string = req.body.first_name;
        const reqLastName : string = req.body.last_name;
        const reqPass : string = req.body.password_hash;

        const regexpPass : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

        if(reqPass.length < 8 || !regexpPass.test(reqPass) || reqPass.includes(' ')){
            return res.status(400).json({
                success: false,
                message: "Password must be shorter than 8 and without special characters, mayus, minus and/or numbers and with spaces)"
            });
        }
        const validEmail : RegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
        if (!validEmail.test(reqMail) ){
          return res.status(400).json(
            {
              success: false,
              message: "Email inserted not valid - Structure wrong"
            }
          )
        }
        const cryptedPass = bcrypt.hashSync(reqPass, 8);

        const newUser = await User.create({
            firstName: reqFirstName,
            lastName: reqLastName,
            email: reqMail,
            password: cryptedPass,
            role: {
                id:1
            }
        }).save()

        return res.status(201).json({
            success: true,
            message: "User registered into DB successfully",
             data: newUser

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register user failure",
            error: error
        });
    }
}
export const LoginUser = async (req : Request, res : Response) => {
    try {
        const userEmail = req.params.email
        const user = await User.find({
        where:{
            email: userEmail,
        }
    })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }
        return res.status(201).json({
            success: true,
            message: "User logged successfully",
            data: user,

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login user failure",
            error: error
        });
    }
}













