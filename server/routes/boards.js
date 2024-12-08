import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Board, List, Card, Label, Comment, sequelize } from '../models/index.js';
import { Op } from 'sequelize';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Get all boards for user
router.get('/', authenticate, async (req, res) => {
  try {
    dbLogger.log(`Fetching boards for user: ${req.user.id}`);
    
    const boards = await Board.findAll({
      where: { user_id: req.user.id },
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
      user_id: req.user.id
    });

    dbLogger.log(`Created new board: ${board.id} for user: ${req.user.id}`);
    res.status(201).json(board);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'Failed to create board'
    });
  }
});

// Create new list
router.post('/:boardId/lists', authenticate, async (req, res) => {
  const { title } = req.body;
  const { boardId } = req.params;

  if (!title?.trim()) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'List title is required'
    });
  }

  try {
    const board = await Board.findOne({
      where: { 
        id: boardId,
        user_id: req.user.id
      }
    });

    if (!board) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Board not found'
      });
    }

    const maxPosition = await List.max('position', {
      where: { board_id: boardId }
    });

    const list = await List.create({
      title: title.trim(),
      board_id: boardId,
      position: (maxPosition || -1) + 1
    });

    dbLogger.log(`Created new list: ${list.id} in board: ${boardId}`);
    res.status(201).json(list);
  } catch (error) {
    dbLogger.error('Error creating list:', error);
    res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'Failed to create list'
    });
  }
});

// Create new card
router.post('/:boardId/lists/:listId/cards', authenticate, async (req, res) => {
  const { title, description } = req.body;
  const { boardId, listId } = req.params;

  if (!title?.trim()) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Card title is required'
    });
  }

  try {
    const list = await List.findOne({
      where: { id: listId },
      include: [{
        model: Board,
        where: { 
          id: boardId,
          user_id: req.user.id
        }
      }]
    });

    if (!list) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'List not found'
      });
    }

    const maxPosition = await Card.max('position', {
      where: { list_id: listId }
    });

    const card = await Card.create({
      title: title.trim(),
      description: description?.trim(),
      list_id: listId,
      position: (maxPosition || -1) + 1
    });

    dbLogger.log(`Created new card: ${card.id} in list: ${listId}`);
    res.status(201).json(card);
  } catch (error) {
    dbLogger.error('Error creating card:', error);
    res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'Failed to create card'
    });
  }
});

// Update card position
router.put('/:boardId/cards/:cardId/move', authenticate, async (req, res) => {
  const { sourceListId, destinationListId, newPosition } = req.body;
  const { boardId, cardId } = req.params;

  if (!sourceListId || !destinationListId || typeof newPosition !== 'number') {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Invalid move parameters'
    });
  }

  try {
    const card = await Card.findOne({
      where: { id: cardId },
      include: [{
        model: List,
        include: [{
          model: Board,
          where: { 
            id: boardId,
            user_id: req.user.id
          }
        }]
      }]
    });

    if (!card) {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Card not found'
      });
    }

    await sequelize.transaction(async (t) => {
      // Update positions of other cards
      if (sourceListId === destinationListId) {
        await Card.increment('position', {
          where: {
            list_id: sourceListId,
            position: { [Op.gte]: newPosition }
          },
          transaction: t
        });
      } else {
        await Card.increment('position', {
          where: {
            list_id: destinationListId,
            position: { [Op.gte]: newPosition }
          },
          transaction: t
        });
      }

      // Update the moved card
      await card.update({
        list_id: destinationListId,
        position: newPosition
      }, { transaction: t });
    });

    dbLogger.log(`Moved card ${cardId} to position ${newPosition} in list ${destinationListId}`);
    res.json({ success: true });
  } catch (error) {
    dbLogger.error('Error moving card:', error);
    res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'Failed to move card'
    });
  }
});

export default router;