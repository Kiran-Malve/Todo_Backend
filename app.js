require("dotenv").config();
const express = require("express");
const connectToDB=require("./config/index");
const userRoutes = require('./routes/index')
const app =express();
const cors=require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDB()
app.use("/", userRoutes);

module.exports = app;
