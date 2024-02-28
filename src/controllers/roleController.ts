import { Request, Response } from "express"
 import { Role } from "../models/Role"


export const getRoles = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Roles retrieved successfuly",
  })
}

export const createdRoles = async (req: Request, res: Response) => {

try {
  const name = req.body.name
  if (name.length > 40) {
    return res.status(400).json({
      success: false,
      message: "Role name must be less than 40 characters",
    })
  }
  const newRole = await Role.create({
  title: name
}).save()

  res.status(201).json({
    success: true,
    message: "Role created successfuly",
    data: newRole
  })

} catch (error) {
  
  res.status(500).json({
    succes: false,
    message: "Can't create roll,",
    error : error
  })
}
}
export const updatedRoles = (req: Request, res: Response) => {
 
  req.params.id
  console.log(req.params.id)

  res.status(200).json({
    success: true,
    message: "Roles updated successfuly",
  })
}

export const deletedRoles = (req: Request, res: Response) => {

    req.params.id
  console.log(req.params.id)
  res.status(200).json({
    success: true,
    message: "Role deleted",
  })
}
