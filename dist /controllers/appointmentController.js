"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyAppointmentWithToken = exports.getAllAppointmentsSuper_admin = exports.recoverAppointmentWithId = exports.showMyAppointmentsWithToken = exports.createAppointmentWithToken = void 0;
const Appointment_1 = require("../models/Appointment");
const User_1 = require("../models/User");
const createAppointmentWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const { appointment_date, service_id } = req.body;
        const newAppointment = yield Appointment_1.Appointment.create({
            appointmentDate: appointment_date,
            userId: userId,
            serviceId: service_id,
        }).save();
        res.status(201).json({
            success: true,
            message: "Appointment created successfuly",
            data: newAppointment,
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: "Can't create appointment,",
            error: error,
        });
    }
});
exports.createAppointmentWithToken = createAppointmentWithToken;
const showMyAppointmentsWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const user = yield User_1.User.find({
            where: {
                id: userId,
            },
            select: {
                appointments: true,
                id: true,
                firstName: true,
                lastName: true,
            },
        });
        const appointment = yield Appointment_1.Appointment.find({
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
        });
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment/s not found",
                error: Error,
            });
        }
        res.status(200).json({
            success: true,
            message: "Appointment retrieved successfuly",
            user,
            appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be retriever successfully",
            error: error,
        });
    }
});
exports.showMyAppointmentsWithToken = showMyAppointmentsWithToken;
const recoverAppointmentWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment_id = req.params.id;
        const { userId } = req.tokenData;
        const appointment = yield Appointment_1.Appointment.find({
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
        });
        if (!appointment.length) {
            return res.status(404).json({
                success: false,
                message: "Appointment id not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Appointment id retrieved successfuly",
            data: appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment id can't be retriever successfully",
            error: error,
        });
    }
});
exports.recoverAppointmentWithId = recoverAppointmentWithId;
const getAllAppointmentsSuper_admin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield Appointment_1.Appointment.find({
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
    });
    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: "Appointment not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Appointment showing successfuly",
        data: appointment,
    });
});
exports.getAllAppointmentsSuper_admin = getAllAppointmentsSuper_admin;
const updateMyAppointmentWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentDate, appointment_id } = req.body;
        const userId = req.tokenData.userId;
        const appointment = yield Appointment_1.Appointment.find({
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
        });
        if (!appointment.length) {
            return res.status(404).json({
                success: false,
                message: "Appointment/s not found",
                error: Error,
            });
        }
        const appointmentToUpdate = yield Appointment_1.Appointment.update({
            userId: userId,
            id: appointment_id,
        }, {
            appointmentDate: appointmentDate,
        });
        if (!appointmentToUpdate.affected) {
            return res.status(404).json({
                success: false,
                message: "Appointment/s not found",
                error: Error,
            });
        }
        res.status(200).json({
            success: true,
            message: "Appointment updated successfuly",
            appointment,
            newDateAppointemnt: appointmentDate,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be updated",
            error: error,
        });
    }
});
exports.updateMyAppointmentWithToken = updateMyAppointmentWithToken;
