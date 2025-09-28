import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../model/user";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const isAlreadyRegistered = await User.findOne({ email });
    if (isAlreadyRegistered) {
      return res.status(400).send({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?email=${email}`
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?email=${email}`

    const currDP = gender === "male" ? maleProfilePic : femaleProfilePic; 

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      profilePic: currDP,
    });

    return res.status(201).send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Not Registered",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password!);
    if (!isPasswordMatch) {
      return res.status(401).send({
        success: false,
        message: "Wrong credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        path:"/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: user,
        message: `Welcome back ${user.name}`,
        token: token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Logout Controller
export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token",{
      httpOnly: true,
      sameSite:"strict",
      path:"/",
    })
    return res
      .status(200)
      .send({
        success: true,
        message: "Logout Successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};




export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const logedInUser = (req as any).id;
    const users = await User.find({_id:{$ne:logedInUser}}).select("-password");
    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};

