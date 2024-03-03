import { Request, Response } from "express"
import { Role } from "../models/Role"

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find({
      select: {
        id: true,
        title: true,
      },
    })
    if (!roles) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
        error: Error,
      })
    }
    res.status(200).json({
      success: true,
      message: "Role retrieved successfuly",
      data: roles,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Role can't be retriever successfully",
      error: error,
    })
  }
}

export const createRoles = async (req: Request, res: Response) => {
  try {
    const name = req.body.roleName
    if (name.length > 40) {
      return res.status(400).json({
        success: false,
        message: "Role name must be less than 40 characters",
      })
    }
    const newRole = await Role.create({
      title: name,
    }).save()

    res.status(201).json({
      success: true,
      message: "Role created successfuly",
      data: newRole,
    })
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Can't create roll,",
      error: error,
    })
  }
}
export const updateRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.findOneBy({
      id: parseInt(req.params.id),
    })
    if (!roles) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      })
    }
    const roleUpdated = await Role.update(
      {
        id: parseInt(req.params.id),
      },
      {
        title: req.body.roleName,
      }
    )

    res.status(200).json({
      success: true,
      message: "Roles updated successfuly",
      previewRole: roles,
      roleUpdated: req.body.roleName,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't be deleted",
      error: error,
    })
  }
}

export const deleteRoles = async (req: Request, res: Response) => {
  try {
    const roleToRemove: any = await Role.findOneBy({
      id: parseInt(req.params.id),
    })
    if (!roleToRemove) {
      return res.status(404).json({
        success: false,
        message: "Role can't be deleted because not exist in Data Base",
      })
    }
    const roleDeleted = await Role.delete(roleToRemove)
    res.status(200).json({
      success: true,
      message: "Role deleted",
      roleDeleted: roleToRemove,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Role can't be deleted",
      error: error,
    })
  }
}
