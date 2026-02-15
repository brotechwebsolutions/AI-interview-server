const express = require("express");
const auth = require("../middleware/authMiddleware");
const { startInterview, submitAnswer } =
  require("../controllers/interviewController");

const router = express.Router();
router.post("/start", auth, startInterview);
router.post("/submit", auth, submitAnswer);

module.exports = router;
