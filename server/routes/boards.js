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
      include: [
        {
          model: List,
          include: [
            {
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

  try {
    const board = await Board.create({
      title,
      user_id: req.user.id,
      company_id: req.user.company_id
    });

    // Create default lists
    await List.bulkCreate([
      { title: 'To Do', board_id: board.id, position: 0 },
      { title: 'In Progress', board_id: board.id, position: 1 },
      { title: 'Done', board_id: board.id, position: 2 }
    ]);

    const newBoard = await Board.findByPk(board.id, {
      include: [
        { model: List, include: [Card] },
        { model: Label }
      ]
    });

    res.status(201).json(newBoard);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    res.status(500).json({ 
      error: 'CREATE_ERROR',
      message: 'Failed to create board'
    });
  }
});

export default router;