import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Board, List, Card, Label, Comment, User } from '../models/index.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Get all boards for user's company
router.get('/', authenticate, async (req, res) => {
  try {
    dbLogger.log(`Fetching boards for company: ${req.user.company_id}`);
    
    const boards = await Board.findAll({
      where: { company_id: req.user.company_id },
      include: [{
        model: List,
        include: [{
          model: Card,
          include: [
            {
              model: User,
              as: 'assignee',
              attributes: ['id', 'name', 'email']
            },
            {
              model: Label,
              through: { attributes: [] }
            },
            {
              model: Comment,
              include: [{
                model: User,
                attributes: ['id', 'name']
              }]
            }
          ]
        }]
      }],
      order: [
        ['created_at', 'DESC'],
        [List, 'position', 'ASC'],
        [List, Card, 'position', 'ASC']
      ]
    });

    res.json(boards);
  } catch (error) {
    dbLogger.error('Error fetching boards:', error);
    res.status(500).json({ message: 'Failed to fetch boards' });
  }
});

// Create new board
router.post('/', authenticate, async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title?.trim()) {
      return res.status(400).json({ message: 'Board title is required' });
    }

    const board = await Board.create({
      title: title.trim(),
      user_id: req.user.id,
      company_id: req.user.company_id
    });

    // Create default lists
    await List.bulkCreate([
      { title: 'To Do', board_id: board.id, position: 0 },
      { title: 'In Progress', board_id: board.id, position: 1 },
      { title: 'Done', board_id: board.id, position: 2 }
    ]);

    // Return the created board with lists
    const createdBoard = await Board.findByPk(board.id, {
      include: [{
        model: List,
        include: [Card]
      }],
      order: [
        [List, 'position', 'ASC'],
        [List, Card, 'position', 'ASC']
      ]
    });

    res.status(201).json(createdBoard);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    res.status(500).json({ message: 'Failed to create board' });
  }
});

export default router;