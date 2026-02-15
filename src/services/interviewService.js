const Interview = require("../models/Interview");
const aiService = require("./aiService");

exports.startInterview = async (userId, role) => {
  const question = await aiService.generateQuestion(role);
  return Interview.create({ userId, role, questions: [question] });
};

exports.submitAnswer = async (interviewId, answer) => {
  const interview = await Interview.findById(interviewId);
  interview.answers.push(answer);
  interview.feedback = await aiService.evaluateAnswer(answer);
  interview.score = Math.floor(Math.random() * 10) + 1;
  return interview.save();
};
