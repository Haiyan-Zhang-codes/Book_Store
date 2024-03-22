
import express, { json } from "express";
import { PORT, DB_URL } from "./config.js";
import mongoose from "mongoose"

import { Book } from "./models/bookModel.js";


const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get("/", (req,res)=>{
    console.log(req)
    res.status(234).send("Hello")
})

app.post("/books", async(req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.send("Please provide full information")
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)       
    }catch(error){
        console.log(error.message)
        res.status(400).send("Failed")
    }
})

app.get("/books", async(req,res)=>{
    try{
        const books = await Book.find({})
        if(!books){
            return res.status(400).send("No book found")
        }
        return res.json({
            count: books.length,
            data: books
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).send(`message: ${error.message}`)
    }
    
})

app.get("/books/:id", async(req,res)=>{
    try{
        const { id } = req.params
        const book = await Book.findById(id)
        if(!book){
            return res.status(400).send("No book found")
        }
        return res.json(book)
    }catch(error){
        console.log(error.message)
        return res.status(500).send(`message: ${error.message}`)
    }
    
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






