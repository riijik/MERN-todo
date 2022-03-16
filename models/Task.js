import mongoose from "mongoose";

const Task = new mongoose.Schema({
    action: { type: String, required: true }
});

export default mongoose.model("Task", Task);