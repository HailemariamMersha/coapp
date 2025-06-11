const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { CohereClient } = require('cohere-ai');

const app = express(); 

// Configure CORS with more permissive settings for development
app.use(cors({
    origin: [
        'https://hailemariammersha.github.io',
        'http://localhost:5000',
        'http://127.0.0.1:5000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:5501',
        'http://127.0.0.1:5501'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    maxAge: 86400 // 24 hours
}));

// Add pre-flight OPTIONS handler
app.options('*', cors());

app.use(express.json());

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

    if (!response || !response.body || !response.body.generations) {
      return res.status(500).json({ error: "Failed to generate feedback" });
    }

    const feedback = response.body.generations[0].text.trim();
    res.json({ feedback });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong with the AI service." });
  }
});

app.listen(5000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:5000");
});
