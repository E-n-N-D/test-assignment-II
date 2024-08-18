import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { hashPassword } from '../utils/hashPassword';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await hashPassword((password));

    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = generateToken({ id: user._id });
    res.status(201).json({ token });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken({ id: user._id });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err });
  }
};
