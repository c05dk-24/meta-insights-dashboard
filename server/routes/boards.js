import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Board, List, Card, Label, Comment, User, sequelize } from '../models/index.js';
import { Op } from 'sequelize';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Get all boards for user's company
router.get('/', authenticate, async (req, res) => {
  try {
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
        [List, Card, 'position', 'ASC'],
        [List, Card, Comment, 'created_at', 'DESC']
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
  const { title } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const board = await Board.create({
      title,
      user_id: req.user.id,
      company_id: req.user.company_id
    }, { transaction });

    // Create default lists
    await List.bulkCreate([
      { title: 'To Do', board_id: board.id, position: 0 },
      { title: 'In Progress', board_id: board.id, position: 1 },
      { title: 'Done', board_id: board.id, position: 2 }
    ], { transaction });

    await transaction.commit();

    const newBoard = await Board.findByPk(board.id, {
      include: [
        { model: List, include: [Card] },
        { model: Label }
      ]
    });

    res.status(201).json(newBoard);
  } catch (error) {
    await transaction.rollback();
    dbLogger.error('Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// Create new list
router.post('/:boardId/lists', authenticate, async (req, res) => {
  const { boardId } = req.params;
  const { title } = req.body;

  try {
    const board = await Board.findOne({
      where: { 
        id: boardId,
        company_id: req.user.company_id
      }
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const maxPosition = await List.max('position', {
      where: { board_id: boardId }
    });

    const list = await List.create({
      title,
      board_id: boardId,
      position: (maxPosition ?? -1) + 1
    });

    res.status(201).json(list);
  } catch (error) {
    dbLogger.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

// Create new card
router.post('/:boardId/lists/:listId/cards', authenticate, async (req, res) => {
  const { listId } = req.params;
  const { title, description } = req.body;

  try {
    const list = await List.findOne({
      where: { id: listId },
      include: [{
        model: Board,
        where: { company_id: req.user.company_id }
      }]
    });

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    const maxPosition = await Card.max('position', {
      where: { list_id: listId }
    });

    const card = await Card.create({
      title,
      description,
      list_id: listId,
      position: (maxPosition ?? -1) + 1
    });

    const newCard = await Card.findByPk(card.id, {
      include: [
        { model: Label },
        { 
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'name']
          }]
        }
      ]
    });

    res.status(201).json(newCard);
  } catch (error) {
    dbLogger.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// Move card
router.put('/:boardId/cards/:cardId/move', authenticate, async (req, res) => {
  const { cardId } = req.params;
  const { sourceListId, destinationListId, newPosition } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const card = await Card.findOne({
      where: { id: cardId },
      include: [{
        model: List,
        include: [{
          model: Board,
          where: { company_id: req.user.company_id }
        }]
      }]
    });

    if (!card) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Card not found' });
    }

    // Update positions in source list
    await Card.update(
      { position: sequelize.literal('position - 1') },
      {
        where: {
          list_id: sourceListId,
          position: { [Op.gt]: card.position }
        },
        transaction
      }
    );

    // Update positions in destination list
    await Card.update(
      { position: sequelize.literal('position + 1') },
      {
        where: {
          list_id: destinationListId,
          position: { [Op.gte]: newPosition }
        },
        transaction
      }
    );

    // Move the card
    await card.update({
      list_id: destinationListId,
      position: newPosition
    }, { transaction });

    await transaction.commit();
    res.json({ success: true });
  } catch (error) {
    await transaction.rollback();
    dbLogger.error('Error moving card:', error);
    res.status(500).json({ error: 'Failed to move card' });
  }
});

export default router;