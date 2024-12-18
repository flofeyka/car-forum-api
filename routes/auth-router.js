import {Router} from "express";
import authController from "../controllers/auth-controller.js";

export const authRouter = Router();

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/sign-in', authController.signIn);
authRouter.delete('/logout', authController.logout);
authRouter.get('/get-user-data', authController.refresh);