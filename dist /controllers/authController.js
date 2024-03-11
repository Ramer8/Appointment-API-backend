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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqMail = req.body.email;
        const reqFirstName = req.body.firstName;
        const reqLastName = req.body.lastName;
        const reqPass = req.body.password;
        //Checking if exist e-mail (user) in the database
        const userDataBase = yield User_1.User.findOne({
            where: {
                email: reqMail,
            },
        });
        if (userDataBase) {
            return res.status(400).json({
                success: false,
                message: "This user email is already exist in owner Data Base",
            });
        }
        if (reqPass.length < 6 || reqPass.length > 10) {
            return res.status(400).json({
                success: false,
                message: "the password has to be between 6 and 10 characters",
            });
        }
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
        if (!validEmail.test(reqMail)) {
            return res.status(400).json({
                success: false,
                message: "Email inserted not valid - Structure wrong",
            });
        }
        const cryptedPass = bcrypt_1.default.hashSync(reqPass, 8);
        const newUser = yield User_1.User.create({
            firstName: reqFirstName,
            lastName: reqLastName,
            email: reqMail,
            password: cryptedPass,
            role: {
                id: 1, //Problem solved, role id =2, by default now the role is 1 ,  "user" . No more is  role id =2, "admin"
            },
        }).save();
        const { password } = newUser, newUserRegistered = __rest(newUser, ["password"]);
        return res.status(201).json({
            success: true,
            message: "User registered into Data Base successfully",
            data: newUserRegistered, //Solved problem "show password" , already not show password hash.
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register user failure",
            error: error,
        });
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, passwordBody } = req.body;
        if (!email || !passwordBody) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed",
            });
        }
        const user = yield User_1.User.findOne({
            where: {
                email: email,
            },
            relations: {
                role: true,
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email o password invalid",
            });
        }
        const isValidPassword = bcrypt_1.default.compareSync(passwordBody, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email o password invalid",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            roleName: user.role.title,
        }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        const { password } = user, userLogged = __rest(user, ["password"]);
        return res.status(200).json({
            success: true,
            message: "User logged successfully",
            token: token,
            data: userLogged,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be logged",
            error: error,
        });
    }
});
exports.LoginUser = LoginUser;
