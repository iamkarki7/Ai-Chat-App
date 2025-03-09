const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const HF_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN; // Store API token in .env
const HF_MODEL = process.env.HUGGINGFACE_MODEL || 'deepseek-ai/DeepSeek-R1-Zero'; // Store model name in .env

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid input. Message must be a non-empty string.' });
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: message },
      {
        headers: { Authorization: `Bearer ${HF_API_TOKEN}` },
      }
    );

    // Extract generated text
    if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
      res.json({ reply: response.data[0].generated_text });
    } else {
      res.status(500).json({ error: 'No valid response from Hugging Face model.' });
    }
  } catch (error) {
    console.error('Error with Hugging Face API:', error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  }
});

module.exports = router;
