// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute.js';
import cors from 'cors';
dotenv.config({
  //add path of .env file
  path:'.env'
})
connectDB().then(() => {
  // Your application logic here, which relies on the database connection
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});
const app = express();
//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
//cors
const corsOptions = {
  origin:`http://localhost:3000`,
  credentials:true
}
app.use(cors(corsOptions));
//api
app.use("/api/v1/user",userRoute)
app.listen(process.env.PORT, () => {
  console.log(`App listening on Port ${process.env.PORT}`)
})  