const Interview = require("../models/Interview");

exports.stats = async (req, res) => {
  const interviews = await Interview.find({ userId: req.user.id });
  const avg =
    interviews.reduce((a, b) => a + (b.score || 0), 0) /
    (interviews.length || 1);

  res.json({
    totalInterviews: interviews.length,
    averageScore: avg
  });
};
