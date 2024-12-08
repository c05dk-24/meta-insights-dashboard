import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getBoardsForCompany, createBoard } from '../services/boardService.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Get all boards for user's company
router.get('/', authenticate, async (req, res) => {
  try {
    dbLogger.log(`Fetching boards for company: ${req.user.company_id}`);
    const boards = await getBoardsForCompany(req.user.company_id);
    res.json(boards);
  } catch (error) {
    dbLogger.error('Error fetching boards:', error);
    res.status(500).json({ 
      error: 'FETCH_ERROR',
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
    const board = await createBoard(title, req.user.id, req.user.company_id);
    res.status(201).json(board);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    res.status(500).json({ 
      error: 'CREATE_ERROR',
      message: 'Failed to create board'
    });
  }
});

export default router;