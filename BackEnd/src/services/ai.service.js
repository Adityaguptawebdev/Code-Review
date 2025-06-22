const { GoogleGenerativeAI } = require('@google/generative-ai');
const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash"});

module.exports = async function getGeminiResponse(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};
