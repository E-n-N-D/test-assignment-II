"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chainController_1 = require("../controllers/chainController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/create', authMiddleware_1.authMiddleware, chainController_1.createChain);
router.get('/', chainController_1.getChains);
exports.default = router;
