```javascript
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
              attributes: ['id', 'name']
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
        [List, Card, 'position', 'ASC'],
        [List, Card, Comment, 'created_at', 'DESC']
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

    // Create default lists
    await List.bulkCreate([
      { title: 'To Do', board_id: board.id, position: 0 },
      { title: 'In Progress', board_id: board.id, position: 1 },
      { title: 'Done', board_id: board.id, position: 2 }
    ]);

    // Fetch the complete board with lists
    const boardWithLists = await Board.findByPk(board.id, {
      include: [{
        model: List,
        include: [{
          model: Card,
          include: [
            {
              model: User,
              as: 'assignee',
              attributes: ['id', 'name']
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
        [List, 'position', 'ASC'],
        [List, Card, 'position', 'ASC'],
        [List, Card, Comment, 'created_at', 'DESC']
      ]
    });

    res.status(201).json(boardWithLists);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    res.status(500).json({ 
      error: 'CREATE_ERROR',
      message: 'Failed to create board'
    });
  }
});

// Create new list in board
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

    // Return complete list with relationships
    const completeList = await List.findByPk(list.id, {
      include: [{
        model: Card,
        include: [
          {
            model: User,
            as: 'assignee',
            attributes: ['id', 'name']
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
      }],
      order: [
        [Card, 'position', 'ASC'],
        [Card, Comment, 'created_at', 'DESC']
      ]
    });

    res.status(201).json(completeList);
  } catch (error) {
    dbLogger.error('Error creating list:', error);
    res.status(500).json({
      error: 'CREATE_ERROR',
      message: 'Failed to create list'
    });
  }
});

export default router;
```