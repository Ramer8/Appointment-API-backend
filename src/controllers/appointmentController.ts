import { Request, Response } from "express"
import { Appointment } from "../models/Appointment"
import { User } from "../models/User"

export const createAppointmentWithToken = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.tokenData.userId
    const { appointment_date, service_id } = req.body
    const newAppointment = await Appointment.create({
      appointmentDate: appointment_date,
      userId: userId,
      serviceId: service_id,
    }).save()
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
export const showMyAppointmentsWithToken = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.tokenData.userId
    const user = await User.find({
      where: {
        id: userId,
      },
      select: {
        appointments: true,
        id: true,
        firstName: true,
        lastName: true,
      },
    })
    const appointment = await Appointment.find({
      order: {
        appointmentDate: "ASC",
      },
      where: {
        userId: userId,
      },
      relations: {
        service: true,
      },
      select: {
        appointmentDate: true,
        id: true,
        service: {
          serviceName: true,
          description: true,
        },
      },
    })
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment/s not found",
        error: Error,
      })
    }
    res.status(200).json({
      success: true,
      message: "Appointment retrieved successfuly",
      user,
      appointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Appointment can't be retriever successfully",
      error: error,
    })
  }
}

export const recoverAppointmentWithId = async (req: Request, res: Response) => {
  try {
    const appointment_id = req.params.id

    const { userId } = req.tokenData

    const appointment = await Appointment.find({
      where: {
        userId: userId,
        id: parseInt(appointment_id),
      },
      relations: {
        service: true,
      },
      select: {
        appointmentDate: true,
        id: true,
        service: {
          serviceName: true,
          description: true,
        },
      },
    })
    if (!appointment.length) {
      return res.status(404).json({
        success: false,
        message: "Appointment id not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Appointment id retrieved successfuly",
      data: appointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Appointment id can't be retriever successfully",
      error: error,
    })
  }
}

export const getAllAppointmentsSuper_admin = async (
  req: Request,
  res: Response
) => {
  const appointment = await Appointment.find({
    order: {
      appointmentDate: "ASC",
    },
    relations: {
      service: true,
    },
    select: {
      appointmentDate: true,

      service: {
        serviceName: true,
        description: true,
      },
    },
  })
  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    })
  }
  res.status(200).json({
    success: true,
    message: "Appointment showing successfuly",
    data: appointment,
  })
}
export const updateMyAppointmentWithToken = async (
  req: Request,
  res: Response
) => {
  try {
    const { appointmentDate, appointment_id } = req.body
    const userId = req.tokenData.userId
    const appointment = await Appointment.find({
      where: {
        userId: userId,
        id: parseInt(appointment_id),
      },
      relations: {
        service: true,
      },
      select: {
        appointmentDate: true,
        id: true,
        service: {
          serviceName: true,
          description: true,
        },
      },
    })
    if (!appointment.length) {
      return res.status(404).json({
        success: false,
        message: "Appointment/s not found",
        error: Error,
      })
    }
    const appointmentToUpdate = await Appointment.update(
      {
        userId: userId,
        id: appointment_id,
      },
      {
        appointmentDate: appointmentDate,
      }
    )
    if (!appointmentToUpdate.affected) {
      return res.status(404).json({
        success: false,
        message: "Appointment/s not found",
        error: Error,
      })
    }
    res.status(200).json({
      success: true,
      message: "Appointment updated successfuly",
      appointment,
      newDateAppointemnt: appointmentDate,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Appointment can't be updated",
      error: error,
    })
  }
}
