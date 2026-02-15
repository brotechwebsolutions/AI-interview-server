const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: String,
    questions: [String],
    answers: [String],
    feedback: String,
    score: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
