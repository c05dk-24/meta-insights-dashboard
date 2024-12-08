import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Board, List, Card, Label, Comment, sequelize } from '../models/index.js';
import { Op } from 'sequelize';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Get all boards for user's company
router.get('/', authenticate, async (req, res) => {
  try {
    dbLogger.log(`Fetching boards for company: ${req.user.company_id}`);
    
    const boards = await Board.findAll({
      where: { company_id: req.user.company_id },
      include: [
        {
          model: List,
          include: [
            {
              model: Card,
              include: [
                { model: Label, through: 'CardLabels' },
                { model: Comment }
              ]
            }
          ]
        },
        { model: Label }
      ],
      order: [
        ['created_at', 'DESC'],
        [List, 'position', 'ASC'],
        [List, Card, 'position', 'ASC']
      ]
    });

    dbLogger.log(`Found ${boards.length} boards`);
    res.json(boards);
  } catch (error) {
    dbLogger.error('Error fetching boards:', error);
    res.status(500).json({ 
      error: 'DATABASE_ERROR',
      message: 'Failed to fetch boards'
    });
  }
});

// Create new board
router.post('/', authenticate, async (req, res) => {
  const { title } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Board title is required'
    });
  }

  try {
    const board = await Board.create({
      title: title.trim(),
      user_id: req.user.id,
      company_id: req.user.company_id
    });

    dbLogger.log(`Created new board: ${board.id} for company: ${req.user.company_id}`);
    res.status(201).json(board);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'Failed to create board'
    });
  }
});

[Rest of the routes remain the same...]

export default router;