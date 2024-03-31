import { Request, Response } from "express"
import { User } from "../models/User"
import { FindOperator, Like } from "typeorm"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      order: {
        lastName: "ASC",
      },
    })

    res.status(200).json({
      success: true,
      message: "user retriever successfully",
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user can't be retriever successfully",
      error: error,
    })
  }
}

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.tokenData
    console.log(userId)
    const user = await User.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "User retriever successfully",
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user can't be retriever successfully",
      error: error,
    })
  }
}
export const getUserByEmailQueryFilters = async (
  req: Request,
  res: Response
) => {
  try {
    interface queryFilters {
      email?: FindOperator<string>
    }
    const queryFilters: queryFilters = {}
    if (req.query.email) {
      queryFilters.email = Like("%" + req.query.email.toString() + "%")
    }
    const userEmail = req.params.email
    const user = await User.find({
      where: {
        email: userEmail,
      },
    })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }
    const users = await User.find({
      where: queryFilters,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    })

    res.status(200).json({
      success: true,
      message: "user retriever successfully",
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user can't be retriever",
      error: error,
    })
  }
}

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const { role_id } = req.body
    //validar datos
    const user = await User.findOneBy({
      id: parseInt(userId),
    })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }
    const roleUserUpdated = await User.update(
      {
        id: parseInt(userId),
      },
      {
        roleId: parseInt(role_id),
      }
    )
    //responder
    res.status(200).json({
      success: true,
      message: "Role user updated ",
      newRole: role_id,
      previewRole: user.roleId,
      fistName: user.firstName,
      lastName: user.lastName,
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "user can't be updated",
      error: error,
    })
  }
}
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId
    const userUpdated = await User.update(
      {
        id: userId,
      },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }
    )
    console.log(userUpdated)
    res.status(200).json({
      success: true,
      message: "User updated ",
      firstNameUpdated: req.body.firstName,
      lastNameUpdated: req.body.lastName,
      emailUpdated: req.body.email,
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "User can't be updated",
      error: error,
    })
  }
}

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const userToRemove: any = await User.findOne({
      where: { id: parseInt(userId) },
      select: ["id", "firstName", "lastName", "email", "createdAt", "roleId"],
    })
    if (userToRemove.roleId === 3 || userToRemove.roleId === 2) {
      return res.status(500).json({
        success: false,
        message: "This user can't be deleted",
      })
    }
    if (!userToRemove) {
      return res.status(404).json({
        success: false,
        message: "User can't be deleted because not exist in Data Base",
      })
    }

    const userDeleted = await User.delete(userToRemove)

    res.status(200).json({
      success: false,
      message: "user deleted successfully",
      data: { userDeleted, userToRemove },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't be deleted",
      error: error,
    })
  }
}
export const deleteMoreThanOneUsers = async (req: Request, res: Response) => {
  try {
    const usersId = req.body.usersId
    const usersToRemove: any[] = await User.createQueryBuilder("user")
      .select([
        "user.id",
        "user.firstName",
        "user.lastName",
        "user.email",
        "user.createdAt",
        "user.roleId",
      ])
      .where("user.id IN (:...usersId)", { usersId })
      .getMany()

    const isSuperAdmin = usersToRemove.find(
      (users) => users.roleId === 3 || users.roleId === 2
    )
    if (isSuperAdmin) {
      return res.status(500).json({
        success: false,
        message: "One of this users can't be deleted",
      })
    }
    if (!usersToRemove.length) {
      return res.status(404).json({
        success: false,
        message: "User/s can't be deleted because not exist in Data Base",
      })
    }
    // const { password, ...newUserRegistered } = newUser

    const userDeleted = await User.delete(usersToRemove)

    res.status(200).json({
      success: false,
      message: "user/s deleted successfully",
      data: userDeleted,
      usersToRemove,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User/s can't be deleted",
      error: error,
    })
  }
}
