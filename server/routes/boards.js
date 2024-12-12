import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Board, List, Card } from '../models/index.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get all boards for user
router.get('/', authenticate, async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: List,
        include: [Card]
      }],
      order: [
        ['created_at', 'DESC'],
        [List, 'position', 'ASC'],
        [List, Card, 'position', 'ASC']
      ]
    });
    res.json(boards);
  } catch (error) {
    logger.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// Create new board
router.post('/', authenticate, async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title?.trim()) {
      return res.status(400).json({ error: 'Board title is required' });
    }

    const board = await Board.create({
      title: title.trim(),
      user_id: req.user.id
    });

    // Create default lists
    await List.bulkCreate([
      { title: 'To Do', board_id: board.id, position: 0 },
      { title: 'In Progress', board_id: board.id, position: 1 },
      { title: 'Done', board_id: board.id, position: 2 }
    ]);

    const boardWithLists = await Board.findByPk(board.id, {
      include: [{ model: List }]
    });

    res.status(201).json(boardWithLists);
  } catch (error) {
    logger.error('Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// Create new list
router.post('/:boardId/lists', authenticate, async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;

    const board = await Board.findOne({
      where: { id: boardId, user_id: req.user.id }
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const maxPosition = await List.max('position', {
      where: { board_id: boardId }
    }) || -1;

    const list = await List.create({
      title,
      board_id: boardId,
      position: maxPosition + 1
    });

    res.status(201).json(list);
  } catch (error) {
    logger.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

export default router;