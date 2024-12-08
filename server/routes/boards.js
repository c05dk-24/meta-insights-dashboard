import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Board, List, Card, Label, Comment } from '../models/index.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Get all boards for user
router.get('/', authenticate, async (req, res) => {
  try {
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
    res.json(boards);
  } catch (error) {
    dbLogger.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// Create new board
router.post('/', authenticate, async (req, res) => {
  try {
    const { title } = req.body;
    const board = await Board.create({
      title,
      user_id: req.user.id
    });
    res.status(201).json(board);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// Create new list
router.post('/:boardId/lists', authenticate, async (req, res) => {
  try {
    const { title } = req.body;
    const board = await Board.findOne({
      where: { id: req.params.boardId, user_id: req.user.id }
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const maxPosition = await List.max('position', {
      where: { board_id: board.id }
    });

    const list = await List.create({
      title,
      board_id: board.id,
      position: (maxPosition || -1) + 1
    });

    res.status(201).json(list);
  } catch (error) {
    dbLogger.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

// Create new card
router.post('/:boardId/lists/:listId/cards', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const list = await List.findOne({
      where: { id: req.params.listId },
      include: [{ model: Board, where: { user_id: req.user.id } }]
    });

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    const maxPosition = await Card.max('position', {
      where: { list_id: list.id }
    });

    const card = await Card.create({
      title,
      description,
      list_id: list.id,
      position: (maxPosition || -1) + 1
    });

    res.status(201).json(card);
  } catch (error) {
    dbLogger.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// Update card position
router.put('/:boardId/cards/:cardId/move', authenticate, async (req, res) => {
  try {
    const { sourceListId, destinationListId, newPosition } = req.body;
    
    const card = await Card.findOne({
      where: { id: req.params.cardId },
      include: [{ 
        model: List,
        include: [{ 
          model: Board,
          where: { user_id: req.user.id }
        }]
      }]
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Update positions in transaction
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

    res.json({ success: true });
  } catch (error) {
    dbLogger.error('Error moving card:', error);
    res.status(500).json({ error: 'Failed to move card' });
  }
});

export default router;