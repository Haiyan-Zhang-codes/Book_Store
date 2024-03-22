import dotenv from "dotenv"
if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}
import express, { json } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors";


const DB_URL = process.env.DB_URL
const app = express()

// Allow all origins with Default of cors
// app.use(cors())

// Allow Custom Origins
app.use(cors({
    origin: 'http://localhost:3000',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get("/", (req,res)=>{
    console.log(req)
    res.status(234).send("Hello")
})

app.use("/books", bookRoutes)

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






