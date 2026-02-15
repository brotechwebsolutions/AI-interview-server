const hf = require("../config/hfClient");

const MODEL = "google/flan-t5-base";

// Generate interview question
exports.generateQuestion = async (role) => {
  try {
    const res = await hf.textGeneration({
      model: MODEL,
      inputs: `Interview question for ${role}:`,
      parameters: {
        max_new_tokens: 40,   // keep small (important)
        temperature: 0.7
      }
    });

    return res.generated_text || "What is REST API?";
  } catch (error) {
    console.error("❌ AI generateQuestion error:", error.message);
    return "What is REST API?";
  }
};

// Evaluate interview answer
exports.evaluateAnswer = async (answer) => {
  try {
    const res = await hf.textGeneration({
      model: MODEL,
      inputs: `Give short interview feedback for this answer:\n${answer}`,
      parameters: {
        max_new_tokens: 50,
        temperature: 0.7
      }
    });

    return res.generated_text || "Good answer, but can be improved.";
  } catch (error) {
    console.error("❌ AI evaluateAnswer error:", error.message);
    return "Good answer, but can be improved.";
  }
};
