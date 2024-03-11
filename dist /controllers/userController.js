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
exports.deleteUserById = exports.updateUserProfile = exports.updateUserRole = exports.getUserByEmailQueryFilters = exports.getUserProfile = exports.getUsers = void 0;
const User_1 = require("../models/User");
const typeorm_1 = require("typeorm");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({
            order: {
                lastName: "ASC",
            },
        });
        res.status(200).json({
            success: true,
            message: "user retriever successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user can't be retriever successfully",
            error: error,
        });
    }
});
exports.getUsers = getUsers;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.tokenData;
        console.log(userId);
        const user = yield User_1.User.findOne({
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
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User retriever successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user can't be retriever successfully",
            error: error,
        });
    }
});
exports.getUserProfile = getUserProfile;
const getUserByEmailQueryFilters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryFilters = {};
        if (req.query.email) {
            queryFilters.email = (0, typeorm_1.Like)("%" + req.query.email.toString() + "%");
        }
        const userEmail = req.params.email;
        const user = yield User_1.User.find({
            where: {
                email: userEmail,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        const users = yield User_1.User.find({
            where: queryFilters,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                createdAt: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "user retriever successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user can't be retriever",
            error: error,
        });
    }
});
exports.getUserByEmailQueryFilters = getUserByEmailQueryFilters;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { role_id } = req.body;
        //validar datos
        const user = yield User_1.User.findOneBy({
            id: parseInt(userId),
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        const roleUserUpdated = yield User_1.User.update({
            id: parseInt(userId),
        }, {
            roleId: parseInt(role_id),
        });
        //responder
        res.status(200).json({
            success: true,
            message: "Role user updated ",
            newRole: role_id,
            previewRole: user.roleId,
            fistName: user.firstName,
            lastName: user.lastName,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "user can't be updated",
            error: error,
        });
    }
});
exports.updateUserRole = updateUserRole;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const userUpdated = yield User_1.User.update({
            id: userId,
        }, {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
        });
        res.status(200).json({
            success: true,
            message: "User updated ",
            firstNameUpdated: req.body.first_name,
            lastNameUpdated: req.body.last_name,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "User can't be updated",
            error: error,
        });
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        // const userToRemove = await User.findOneBy({
        const userToRemove = yield User_1.User.findOneBy({
            id: parseInt(userId),
        });
        if (!userToRemove) {
            return res.status(404).json({
                success: false,
                message: "User can't be deleted because not exist in Data Base",
            });
        }
        const userDeleted = yield User_1.User.delete(userToRemove);
        res.status(200).json({
            success: false,
            message: "user deleted successfully",
            data: userDeleted,
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
exports.deleteUserById = deleteUserById;
