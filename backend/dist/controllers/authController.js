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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const hashPassword_1 = require("../utils/hashPassword");
const jwt_1 = require("../utils/jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser)
            return res.status(400).json({ msg: 'User already exists' });
        const hashedPassword = yield (0, hashPassword_1.hashPassword)((password));
        const user = new userModel_1.default({ username, password: hashedPassword });
        yield user.save();
        const token = (0, jwt_1.generateToken)({ id: user._id });
        res.status(201).json({ token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ username });
        if (!user)
            return res.status(400).json({ msg: 'Invalid credentials' });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid credentials' });
        const token = (0, jwt_1.generateToken)({ id: user._id });
        res.status(200).json({ token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
});
exports.login = login;
