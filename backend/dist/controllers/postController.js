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
exports.getChainPosts = exports.replyPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const chainModel_1 = __importDefault(require("../models/chainModel"));
const replyPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chain, prevPost, operation, operand } = req.body;
    console.log(req.body);
    try {
        if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
            return res.status(401).json({ msg: 'Unauthorized: No user found' });
        }
        const author = req.user.id;
        let result;
        if (!prevPost) {
            console.log(chain);
            const chainResult = yield chainModel_1.default.findById(chain);
            result = chainResult.startNumber;
        }
        else {
            const post = yield postModel_1.default.findById(prevPost);
            result = post.result;
        }
        switch (operation) {
            case 'add':
                result += operand;
                break;
            case 'subtract':
                result -= operand;
                break;
            case 'multiply':
                result *= operand;
                break;
            case 'divide':
                if (operand === 0)
                    return res.status(400).json({ msg: 'Cannot divide by 0' });
                result /= operand;
                break;
            default:
                return res.status(400).json({ msg: 'Invalid operation' });
        }
        console.log(result);
        const post = new postModel_1.default({ chain, author, prevPost, operation, operand, result });
        yield post.save();
        res.status(201).json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.replyPost = replyPost;
const getChainPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chainId = req.params.id;
    try {
        const posts = yield postModel_1.default.find({ chain: chainId }).populate('author', 'username');
        res.status(200).json(posts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.getChainPosts = getChainPosts;
// export const getTopPosts = async (req: Request, res: Response) => {
//   const chainId = req.params.id;
//   try {
//     const posts = await Post.find({chain: chainId, previousPost: { $exists: false }}).populate('author', 'username');
//     res.status(200).json(posts);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ msg: 'Server error' });
//   }
// };
// export const getChildPosts = async (req: Request, res: Response) => {
//   const chainId = req.params.id;
//   const { previousPost } = req.body;
//   try {
//     const posts = await Post.find({chain: chainId, previousPost: previousPost}).populate('author', 'username');
//     res.status(200).json(posts);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ msg: 'Server error' });
