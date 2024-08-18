import { Request, Response } from 'express';
import Post from '../models/postModel';
import Chain from '../models/chainModel';

export const replyPost = async (req: Request, res: Response) => {
  const { chain, prevPost, operation, operand } = req.body;
  console.log(req.body)

  try {
    if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
        return res.status(401).json({ msg: 'Unauthorized: No user found' });
    }

    const author = (req.user as { id: string }).id;

    let result:number;

    if(!prevPost){
      console.log(chain)
      const chainResult = await Chain.findById(chain);
      result = chainResult!.startNumber;
    }else{
      const post = await Post.findById(prevPost);
      result = post!.result;
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
        if (operand === 0) return res.status(400).json({ msg: 'Cannot divide by 0' });
        result /= operand;
        break;
      default:
        return res.status(400).json({ msg: 'Invalid operation' });
    }

    console.log(result)

    const post = new Post({ chain, author, prevPost, operation, operand, result });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getChainPosts = async (req: Request, res: Response) => {
  const chainId = req.params.id;

  try {
    const posts = await Post.find({chain: chainId}).populate('author', 'username');
    res.status(200).json(posts);
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
};


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