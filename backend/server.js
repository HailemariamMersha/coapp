const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { CohereClient } = require('cohere-ai');

const app = express(); 
app.use(cors());
app.use(express.json());

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

app.get("/", (req, res) => {
  res.send("CoApp backend is working!");
});

app.post("/feedback", async (req, res) => {
  const { essay } = req.body;

  try {
    const response = await cohere.generate({
      model: 'command',
      prompt: `You are an experienced college essay reviewer. Please provide constructive feedback on the following essay, focusing on clarity, structure, and impact:\n\n${essay}`,
      max_tokens: 300,
      temperature: 0.7,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });

    if (!response || !response.generations) {
      return res.status(500).json({ error: "Failed to generate feedback" });
    }

    const feedback = response.generations[0].text.trim();
    res.json({ feedback });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong with the AI service." });
  }
});

app.listen(5000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:5000");
});
