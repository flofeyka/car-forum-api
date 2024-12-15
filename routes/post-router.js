import {Router} from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import roleMiddleware from "../middlewares/role-middleware.js";
import postController from "../controllers/post-controller.js";

export const postRouter = Router();

postRouter.post('/', authMiddleware, roleMiddleware('admin'), postController.createPost);
postRouter.put('/:id', authMiddleware, roleMiddleware('admin'), postController.updatePost);
postRouter.delete("/:id", authMiddleware, roleMiddleware('admin'), postController.deletePost);
postRouter.get("/:id", postController.getPost);
postRouter.get("/", postController.getPosts);