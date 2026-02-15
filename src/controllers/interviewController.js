const interviewService = require("../services/interviewService");

exports.startInterview = async (req, res) => {
  const interview = await interviewService.startInterview(
    req.user.id,
    req.body.role
  );
  res.json(interview);
};

exports.submitAnswer = async (req, res) => {
  const interview = await interviewService.submitAnswer(
    req.body.interviewId,
    req.body.answer
  );
  res.json(interview);
};
