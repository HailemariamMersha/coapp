const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cohere = require('cohere-ai');

const app = express(); 

// Initialize Cohere client
cohere.init(process.env.COHERE_API_KEY);

// Basic CORS setup
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CoApp backend is working!" });
});

// Feedback endpoint
app.post("/feedback", async (req, res) => {
  const { essay } = req.body;

  if (!essay) {
    return res.status(400).json({ error: "Essay is required" });
  }

  try {
    console.log('Generating feedback for essay...');
    const response = await cohere.generate({
      model: 'command',
      prompt: `You are an experienced college essay reviewer. Please provide constructive feedback on the following essay, focusing on clarity, structure, and impact:\n\n${essay}`,
      max_tokens: 300,
      temperature: 0.7,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });

    console.log('Received response from Cohere');

    if (!response || !response.body || !response.body.generations) {
      console.error('Invalid response from Cohere:', response);
      return res.status(500).json({ error: "Failed to generate feedback" });
    }

    const feedback = response.body.generations[0].text.trim();
    res.json({ feedback });

  } catch (err) {
    console.error('Error generating feedback:', err);
    res.status(500).json({ error: "Something went wrong with the AI service." });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: "Internal server error" });
});

// Use PORT from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
