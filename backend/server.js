const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { CohereClient } = require('cohere-ai');

const app = express(); 

// Configure CORS
app.use(cors({
    origin: ['https://hailemariammersha.github.io', 'http://localhost:5000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// Initialize Cohere client
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("CoApp backend is working!");
});

// Feedback endpoint
app.post("/feedback", async (req, res) => {
  const { essay } = req.body;

  try {
    const result = await cohere.generate({
      model: 'command',
      prompt: `You are an experienced college essay reviewer. Please provide constructive feedback on 
the following essay, focusing on clarity, structure, and impact:

${essay}`,
      max_tokens: 300,
      temperature: 0.7,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });

    if (!result || !result.generations) {
      return res.status(500).json({ error: "Failed to generate feedback" });
    }

    const feedback = result.generations[0].text.trim();
    res.json({ feedback });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong with the AI service." });
  }
});

// Use PORT from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
