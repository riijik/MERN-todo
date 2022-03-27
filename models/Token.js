import mongoose from "mongoose";

const Token = new mongoose.Schema({
    refreshToken: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  });
  
  export default mongoose.model("Token", Token);
  