import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subsriptionRouter from "./routes/subsription.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import workflowRouter from "./routes/workflow.route.js";

const app = express();

// Built in node js middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
// app.use(arcjetMiddleware)


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/subscriptions",subsriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);
app.get("/",(req, res)=>{
    res.send("Welcome here to the application")
})


app.listen(PORT,async()=>{
    console.log(`Api running on localhost:${PORT}`);

    await connectToDatabase();

})

export default app;