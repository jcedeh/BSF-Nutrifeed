import mongoose from "mongoose";
import Batch from "./batch.js";

const environmentSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch"
  },

  temperature: Number,
  humidity: Number,

  recorded_at: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

const Environment = mongoose.model("Environment", environmentSchema);
export default Environment;
