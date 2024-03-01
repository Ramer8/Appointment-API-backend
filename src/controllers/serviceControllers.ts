import { Request, Response } from "express"
import { Service } from "../models/Service"

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body
    console.log(name, "&", description)

    // if (!name || !description ){
    // }

    if (name.length > 255) {
      return res.status(400).json({
        success: false,
        message:
          "Service name and description must be less than 255 characters",
      })
    }
    const newService = await Service.create({
      serviceName: name,
      description: description,
    }).save()

    console.log(newService)
    res.status(201).json({
      success: true,
      message: "Service created successfuly",
      data: newService,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't create service,",
      error: error,
    })
  }
}
export const getServices = async (req: Request, res: Response) => {
  try {
    const service = await Service.find({
      select: {
        id: true,
        serviceName: true,
        description: true,
      },
    })
    console.log(service)
    res.status(200).json({
      success: true,
      message: "Service retrieved successfuly",
      data: service,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Service can't be retriever successfully",
      error: error,
    })
  }
}
export const updateService = (req: Request, res: Response) => {
  req.params.id
  console.log(req.params.id)

  res.status(200).json({
    success: true,
    message: "Service updated successfuly",
  })
}

export const deleteService = (req: Request, res: Response) => {
  req.params.id
  console.log(req.params.id)
  res.status(200).json({
    success: true,
    message: "Service deleted",
  })
}