import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Board, List, Card, Label, Comment, User } from '../models/index.js';
import { getBoardsForCompany, createBoard } from '../services/boardService.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Get all boards for user's company
router.get('/', authenticate, async (req, res) => {
  try {
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

// Create new list
router.post('/:boardId/lists', authenticate, async (req, res) => {
  const { boardId } = req.params;
  const { title } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'List title is required'
    });
  }

  try {
    // Verify board belongs to user's company
    const board = await Board.findOne({
      where: { 
        id: boardId,
        company_id: req.user.company_id
      }
    });

    if (!board) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Board not found'
      });
    }

    // Get max position
    const maxPosition = await List.max('position', {
      where: { board_id: boardId }
    }) || -1;

    // Create new list
    const list = await List.create({
      title: title.trim(),
      board_id: boardId,
      position: maxPosition + 1
    });

    res.status(201).json(list);
  } catch (error) {
    dbLogger.error('Error creating list:', error);
    res.status(500).json({ 
      error: 'CREATE_ERROR',
      message: 'Failed to create list' 
    });
  }
});

export default router;