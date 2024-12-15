import {Router} from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import userController from "../controllers/user-controller.js";

export const userRouter = Router();

userRouter.put('/edit', authMiddleware, userController.editUser);
userRouter.get("/:id", authMiddleware, userController.getUserById);