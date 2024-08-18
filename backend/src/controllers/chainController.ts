import { Request, Response } from 'express';
import Chain from '../models/chainModel';

export const createChain = async (req: Request, res: Response) =>{
    const { startNumber } = req.body;
  
    try {
        if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
          return res.status(401).json({ msg: 'Unauthorized: No user found' });
      }
  
      const author = (req.user as { id: string }).id;
  
      const chain = new Chain({author, startNumber});
      await chain.save();
  
      res.status(201).json(chain);
  
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'Server error' });
    }
  }

  export const getChains = async (req: Request, res: Response) => {
    try {
      const chains = await Chain.find().populate('author', 'username');
      res.status(200).json(chains);
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'Server error' });
    }
  };