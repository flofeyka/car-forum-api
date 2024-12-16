import {Router} from "express";
import forumController from "../controllers/forum-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import accessMiddleware from "../middlewares/access-middleware.js";
import Forum from "../models/Forum.js";
import messageController from "../controllers/message-controller.js";
import Message from "../models/Message.js";

export const forumRouter = Router();

forumRouter.get("/:id", forumController.getForumById);
forumRouter.get("/", forumController.getForums);
forumRouter.post("/", authMiddleware, forumController.createForum);
forumRouter.put("/:id", authMiddleware, accessMiddleware(Forum), forumController.updateForum);
forumRouter.delete("/:id", authMiddleware, accessMiddleware(Forum), forumController.deleteForum);
forumRouter.post("/:id/message", authMiddleware, messageController.sendMessage);
forumRouter.delete("/message/:id", authMiddleware, accessMiddleware(Message), messageController.deleteMessage);
forumRouter.put("/message/:id", authMiddleware, accessMiddleware(Message), messageController.updateMessage);