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
exports.getChains = exports.createChain = void 0;
const chainModel_1 = __importDefault(require("../models/chainModel"));
const createChain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startNumber } = req.body;
    try {
        if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
            return res.status(401).json({ msg: 'Unauthorized: No user found' });
        }
        const author = req.user.id;
        const chain = new chainModel_1.default({ author, startNumber });
        yield chain.save();
        res.status(201).json(chain);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.createChain = createChain;
const getChains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chains = yield chainModel_1.default.find().populate('author', 'username');
        res.status(200).json(chains);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.getChains = getChains;
