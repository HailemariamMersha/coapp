const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { CohereClient } = require('cohere-ai');

const app = express(); 

// Initialize Cohere client
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

// Configure CORS with more permissive settings for development
app.use(cors({
    origin: '*', // Allow all origins for now
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));

// Add pre-flight OPTIONS handler
app.options('*', cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CoApp backend is working!" });
});

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

    if (!response || !response.generations) {
      console.error('Invalid response from Cohere:', response);
      return res.status(500).json({ error: "Failed to generate feedback" });
    }

    const feedback = response.generations[0].text.trim();
    res.json({ feedback });

  } catch (err) {
    console.error('Error generating feedback:', err);
    res.status(500).json({ error: "Something went wrong with the AI service." });
  }
});

// Use PORT from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
