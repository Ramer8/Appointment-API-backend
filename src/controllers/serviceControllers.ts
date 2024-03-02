import { Request, Response } from "express"
import { Service } from "../models/Service"

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body
    console.log(name, "&", description)

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Service name and description can't be null",
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
export const updateService = async (req: Request, res: Response) => {
  const service = await Service.findOneBy({
    id: parseInt(req.params.id),
  })
  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found",
      error: Error,
    })
  }
  const serviceToUpdtade = await Service.update(
    {
      id: parseInt(req.params.id),
    },
    {
      serviceName: req.body.service_name,
      description: req.body.service_description,
    }
  )

  res.status(200).json({
    success: true,
    message: "Service updated successfuly",
  })
}

export const deleteService = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id)

    const serviceToRemove: any = await Service.findOneBy({
      id: parseInt(req.params.id),
    })

    if (!serviceToRemove) {
      return res.status(404).json({
        success: false,
        message: "Service can't be deleted because not exist in Data Base",
      })
    }
    const serviceDeleted = await Service.delete(serviceToRemove)
    res.status(200).json({
      success: true,
      message: "Service deleted",
      serviceDeleted: serviceToRemove,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't be deleted",
      error: error,
    })
  }
}
