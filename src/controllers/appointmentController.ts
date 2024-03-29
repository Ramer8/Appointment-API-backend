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

export const retrieveAppointmentWithId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params
  const appointment = await Appointment.findOneBy({
    id: parseInt(id),
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
    const userId = req.tokenData.userId

    console.log(userId)

    const ID_params = req.params.userId
    console.log("mi params es", ID_params)

    const { appointmentDate, serviceId } = req.body

    console.log("el id del body es", serviceId)
    console.log(appointmentDate)
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

        service: {
          serviceName: true,
          description: true,
        },
      },
    })
    if (!appointment.length) {
      return res.status(404).json({
        success: false,
        message: "User without appointments",
        error: Error,
      })
    }
    console.log(appointment)
    console.log("ID appointment is:", appointment[0].id)
    console.log("appointment", appointment[0])

    const appointmentToUpdate = await Appointment.update(
      {
        id: appointment[0].id,
      },
      {
        appointmentDate: appointmentDate,
        serviceId: serviceId,
      }
    )
    if (!appointmentToUpdate) {
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
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Appointment can't be updated",
      error: error,
    })
  }
}
