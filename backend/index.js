
import express from "express";
import { PORT, DB_URL } from "./config.js";
import mongoose from "mongoose"


const app = express()

app.get("/", (req,res)=>{
    console.log(req)
    res.status(234).send("Hello")
})


mongoose.connect(DB_URL)
.then(()=>{
    console.log("App is connected to database")
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})






