const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

router.get("/get-response", aiController.getResponse);

router.post("/review", async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }
    try {
        // Compose a prompt for code review and correction
        const prompt = `Review the following code and provide feedback. Then, provide a corrected version if needed.\n\nCode:\n${code}\n\nRespond in this JSON format: {\"feedback\":\"<feedback>\",\"correctedCode\":\"<corrected code>\"}`;
        const aiResponse = await require('../services/ai.service')(prompt);
        // Try to parse the AI's response as JSON
        let result;
        try {
            result = JSON.parse(aiResponse);
        } catch (e) {
            // fallback: return raw response as feedback
            result = { feedback: aiResponse, correctedCode: code };
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;