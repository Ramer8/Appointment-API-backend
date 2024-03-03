import { Request, Response } from "express"
import { User } from "../models/User"

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
    const user = await User.findOneBy({
      id: req.tokenData.userId,
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
// export const getUserbyEmail = async (req: Request, res: Response) => {
//   try {
//     const userEmail = req.params.email
//     const user = await User.find({
//       where: {
//         email: userEmail,
//       },
//     })
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "user not found",
//       })
//     }
//     res.status(200).json({
//       success: true,
//       message: "user retriever successfully3333",
//       data: user,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "user can't be retriever successfully",
//       error: error,
//     })
//   }
// }

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const { role_id } = req.body
    //validar datos
    const user = await User.findOneBy({
      id: parseInt(userId),
    })
    console.log(user)
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
    console.log("the role id updated is ", role_id)
    //responder
    res.status(200).json({
      success: true,
      message: "Role user updated ",
      data: roleUserUpdated,
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
        firstName: req.body.first_name,
        lastName: req.body.last_name,
      }
    )

    res.status(200).json({
      success: true,
      message: "User updated ",
      firstNameUpdated: req.body.first_name,
      lastNameUpdated: req.body.last_name,
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
    console.log(req.params.id)

    const userId = req.params.id
    // const userToRemove = await User.findOneBy({
    const userToRemove: any = await User.findOneBy({
      id: parseInt(userId),
    })

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
      data: userDeleted,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't be deleted",
      error: error,
    })
  }
}
