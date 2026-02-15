const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
    status: { type: String, default: "active" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
