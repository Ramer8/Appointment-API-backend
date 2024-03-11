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
exports.deleteService = exports.updateService = exports.getServices = exports.createService = void 0;
const Service_1 = require("../models/Service");
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Service name and description can't be null",
            });
        }
        const newService = yield Service_1.Service.create({
            serviceName: name,
            description: description,
        }).save();
        res.status(201).json({
            success: true,
            message: "Service created successfuly",
            data: newService,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't create service,",
            error: error,
        });
    }
});
exports.createService = createService;
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.Service.find({
            select: {
                id: true,
                serviceName: true,
                description: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "Service retrieved successfuly",
            data: service,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Service can't be retriever successfully",
            error: error,
        });
    }
});
exports.getServices = getServices;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.Service.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
                error: Error,
            });
        }
        const serviceToUpdtade = yield Service_1.Service.update({
            id: parseInt(req.params.id),
        }, {
            serviceName: req.body.service_name,
            description: req.body.service_description,
        });
        res.status(200).json({
            success: true,
            message: "Service updated successfuly",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Service can't be deleted",
            error: error,
        });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceToRemove = yield Service_1.Service.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!serviceToRemove) {
            return res.status(404).json({
                success: false,
                message: "Service can't be deleted because not exist in Data Base",
            });
        }
        const serviceDeleted = yield Service_1.Service.delete(serviceToRemove);
        res.status(200).json({
            success: true,
            message: "Service deleted",
            serviceDeleted: serviceToRemove,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be deleted",
            error: error,
        });
    }
});
exports.deleteService = deleteService;
