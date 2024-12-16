import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import {authRouter} from "./routes/auth-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import cookieParser from "cookie-parser";
import {userRouter} from "./routes/user-router.js";
import {postRouter} from "./routes/post-router.js";
import {forumRouter} from "./routes/forum-router.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/forum', forumRouter);
app.use(errorMiddleware);

app.listen(port, async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server started on port ${port}`)
});