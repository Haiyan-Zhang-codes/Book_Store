import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send("Please provide full information");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Failed");
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    if (!books) {
      return res.status(400).send("No book found");
    }
    return res.json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`message: ${error.message}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(400).send("No book found");
    }
    return res.json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`message: ${error.message}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send("Full information required");
    }
    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, req.body);
    if (updateBook) {
      res.send("Updated");
    }
    res.send("Book not found");
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (deleteBook) {
      return res.status(200).send("Deleted");
    }
    return res.status(404).send("Book not found");
  } catch (error) {
    console.log(error);
  }
});

export default router;
