import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { generateContent } from '../services/openai.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

router.post('/generate', authenticate, async (req, res) => {
  try {
    const { prompt, preferences } = req.body;

    if (!prompt || !preferences) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Prompt and preferences are required'
      });
    }

    const content = await generateContent(prompt, preferences);
    
    res.json({ content });
  } catch (error) {
    dbLogger.error('AI generation error:', error);
    res.status(500).json({
      error: 'GENERATION_ERROR',
      message: 'Failed to generate content'
    });
  }
});

export default router;