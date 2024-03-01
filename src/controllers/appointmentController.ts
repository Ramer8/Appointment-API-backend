import { Request, Response } from "express"
import { Appointment } from "../models/Appointment"

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { appointment_date, user_id, service_id } = req.body
    console.log(appointment_date, user_id, service_id)

    const newAppointment = await Appointment.create({
      appointmentDate: appointment_date,
      userId: user_id,
      serviceId: service_id,
    }).save()
    //
    console.log(newAppointment)
    res.status(201).json({
      success: true,
      message: "Appointment created successfuly",
      data: newAppointment,
    })
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Can't create appointment,",
      error: error,
    })
  }
}

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.find({
      order: {
        appointmentDate: "ASC",
      },
    })
    res.status(200).json({
      success: true,
      message: "Appointment retrieved successfuly",
      data: appointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Appointment can't be retriever successfully",
      error: error,
    })
  }
}

export const updateAppointment = (req: Request, res: Response) => {
  req.params.id
  console.log(req.params.id)

  res.status(200).json({
    success: true,
    message: "Appointment updated successfuly",
  })
}

export const showMyAppointment = (req: Request, res: Response) => {
  req.params.id
  console.log(req.params.id)
  res.status(200).json({
    success: true,
    message: "Role deleted",
  })
}
