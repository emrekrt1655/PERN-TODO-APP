import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ITodo, IDecodedToken } from "../utils/types";

const tokenEnv = {
  access: process.env.ACCESS_TOKEN_SECRET,
};

const prisma = new PrismaClient();

const todoControllers = {
  getTodos: async (req: Request, res: Response) => {
    try {
      const todos: ITodo[] = await prisma.todo.findMany({
        where: { todoUserId: req.params.userId },
      });
      return res.status(200).json({
        status: "success",
        message: "All todos found",
        data: todos,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id)
        return res
          .status(400)
          .json({ message: "Please Login to create a todo" });
      const { text, todoUserId } = req.body;
      const todo = await prisma.todo.create({
        data: {
          todoId: `${
            text.slice(0, 20).replace(/\s+/g, "") +
            new Date().getMilliseconds() * 5
          }`,
          text: text,
          todoUserId: todoUserId,
        },
      });
      res
        .status(200)
        .json({ status: "success", message: "Todo is created", data: todo });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { todoId } = req.params;
      const todo = await prisma.todo.findUnique({
        where: { todoId: todoId },
      });
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid Token" });
      if (id !== todo!.todoUserId)
        return res
          .status(400)
          .json({ message: "You are not authorized to delete this" });
      const deletedTodo = await prisma.todo.delete({
        where: { todoId: req.params.todoId },
      });

      return res
        .status(200)
        .send({ message: `${deletedTodo.todoId} deleted successfully` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id, user } = decoded;
      console.log(decoded);
      if (!id) return res.status(400).json({ message: "Invalid token" });

      const todo = await prisma.todo.findUnique({
        where: { todoId: req.params.todoId },
      });

      if (id !== todo?.todoUserId)
        return res
          .status(400)
          .json({ message: "You are not authorized to update todo" });

      const updatedTodo = await prisma.todo.update({
        where: { todoId: req.params.todoId },
        data: <ITodo>{
          todoId: todo.todoId,
          text: req.body.text,
          todoUserId: todo.todoUserId,
        },
      });

      res.status(200).json({
        status: "OK",
        message: "Todo Text updated successfully",
        data: <ITodo>updatedTodo,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  done: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid token" });

      const todo = await prisma.todo.findUnique({
        where: { todoId: req.params.todoId },
      });

      if (id !== todo?.todoUserId)
        return res
          .status(400)
          .json({ message: "You are not authorized to update todo" });

      const updatedTodo = await prisma.todo.update({
        where: { todoId: req.params.todoId },
        data: <ITodo>{
          todoId: todo.todoId,
          text: todo.text,
          todoUserId: todo.todoUserId,
          todoDone: req.body.todoDone,
        },
      });
      res.status(200).json({
        status: "OK",
        message: "Todo Done updated successfully",
        data: <ITodo>updatedTodo,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default todoControllers;
