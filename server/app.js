import express from "express";
const app= express();
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import authrouter from "./routes/authRouter.js"
import categoryRouter  from "./routes/categoryRouter.js"
import productRouter from "./routes/productRouter.js"
import  connectDB from "./config/db.js";
dotenv.config({path:'./config.env'});
app.use(express.json());
dotenv.config();
connectDB();
app.use("/api/v1/auth",authrouter);
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/product",productRouter)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}`)
});

