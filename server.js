import mongoose from "mongoose";
import express from "express";
import  Task from "./models/Task.js"

const app = express();
app.use(express.json());

const url = 'mongodb://127.0.0.1:27017/todo';

app.post("/todo", async (req, res) => {
    if (req.body.action) {
        Task.create(req.body).then((data) => res.json(data))
    } else {
        res.json({ error: "the input is empty" })
    }
})

async function startApp() {
    try {
        await mongoose.connect(url);
        app.listen(8000, () => console.log(`Shalom ti na 8000 porte`));
        console.log(`MongoDB Connected: ${url}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startApp();