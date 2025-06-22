const aiService = require('../services/ai.service');

module.exports.getResponse = async (req, res) => {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).json({ message: "Please enter a prompt" });
    }

    try {
        const response = await aiService(prompt);
        res.send(response); // ✅ fixed
    } catch (err) {
        res.status(500).json({ error: "AI service failed", details: err.message });
    }
};
