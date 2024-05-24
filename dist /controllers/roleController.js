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
exports.deleteRoles = exports.updateRoles = exports.createRoles = exports.getRoles = void 0;
const Role_1 = require("../models/Role");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.Role.find({
            select: {
                id: true,
                title: true,
            },
        });
        if (!roles) {
            return res.status(404).json({
                success: false,
                message: "Role not found",
                error: Error,
            });
        }
        res.status(200).json({
            success: true,
            message: "Role retrieved successfuly",
            data: roles,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Role can't be retriever successfully",
            error: error,
        });
    }
});
exports.getRoles = getRoles;
const createRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.roleName;
        if (name.length > 40) {
            return res.status(400).json({
                success: false,
                message: "Role name must be less than 40 characters",
            });
        }
        const newRole = yield Role_1.Role.create({
            title: name,
        }).save();
        res.status(201).json({
            success: true,
            message: "Role created successfuly",
            data: newRole,
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: "Can't create roll,",
            error: error,
        });
    }
});
exports.createRoles = createRoles;
const updateRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.Role.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!roles) {
            return res.status(404).json({
                success: false,
                message: "Role not found",
            });
        }
        const roleUpdated = yield Role_1.Role.update({
            id: parseInt(req.params.id),
        }, {
            title: req.body.roleName,
        });
        res.status(200).json({
            success: true,
            message: "Roles updated successfuly",
            previewRole: roles,
            roleUpdated: req.body.roleName,
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
exports.updateRoles = updateRoles;
const deleteRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleToRemove = yield Role_1.Role.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!roleToRemove) {
            return res.status(404).json({
                success: false,
                message: "Role can't be deleted because not exist in Data Base",
            });
        }
        const roleDeleted = yield Role_1.Role.delete(roleToRemove);
        res.status(200).json({
            success: true,
            message: "Role deleted",
            roleDeleted: roleToRemove,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Role can't be deleted",
            error: error,
        });
    }
});
exports.deleteRoles = deleteRoles;
