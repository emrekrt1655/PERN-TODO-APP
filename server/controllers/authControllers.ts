import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, IDecodedToken } from "../utils/types";
import {
  genActiveToken,
  genAccessToken,
  genRefreshToken,
} from "../config/genToken";

const prisma = new PrismaClient();

const tokenEnv = {
  active: process.env.ACTIVE_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
  access: process.env.ACCESS_TOKEN_SECRET,
};

const authControllers = {
  register: async (req: Request, res: Response) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const password = await bcrypt.hash(req.body.password, 12);

    const { userName, email } = req.body;

    try {
      const user: IUser = {
        userId: `${userName + new Date().getMilliseconds() * 5}`,
        userName: userName,
        email: email,
        password: password,
      };

      await prisma.user.create({
        data: {
          userId: user.userId,
          userName: user.userName,
          email: user.email,
          password: user.password,
        },
      });
      res.status(200).json({ message: "Account has been registered" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user)
        return res
          .status(400)
          .json({ message: "This account does not exists" });
      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.status(200).json({ message: "Logged Out!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ mesage: "Please Login nowwww!" });
      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${tokenEnv.refresh}`)
      );
      if (!decoded.id)
        return res.status(400).json({ mesage: "Please Login now!" });

      const user = await prisma.user.findUnique({
        where: { userId: decoded.id },
        //TODO
        //select: {password: false}
      });
      if (!user)
        return res.status(404).json({ mesage: "This account does not exist." });

      const access_token = genAccessToken({ id: user.userId });

      res.status(200).json({ access_token, user });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  getUsers: async (req: Request, res: Response) => {
    try {
      const users: IUser[] = await prisma.user.findMany({
        include: {
          _count: {
            select: {
              todos: true,
            },
          },
        },
      });
      return res.json({
        status: "success",
        message: "All users found",
        data: users,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.messege });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
  return res.status(400).json({ message: "Password is incorrect" });
  //after login creates a access token
  const access_token = genAccessToken({ id: user.userId });
  // it creates a new access token
  const refresh_token = genRefreshToken({ id: user.userId });
  
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/refresh_token",
    maxAge: 30 * 24 * 60 * 1000, //30 days
  });
  

  res.json({
    message: "Login successfully completed!",
    access_token,
    user,
    // user: { ...user, password: "" },
  });
};

export default authControllers;
