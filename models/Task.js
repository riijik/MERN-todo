import mongoose from "mongoose";

const Task = new mongoose.Schema({
  action: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Task", Task);
