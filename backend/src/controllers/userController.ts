import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/auth";

import User from "../models/User";

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        username: existingUser.username,
        id: existingUser.id,
      },
      SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res
      .status(200)
      .json({ result: existingUser, token, message: "Successfully logged in" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    res.status(200).json({ message: "Successfully created an account" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
