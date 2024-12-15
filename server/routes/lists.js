import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { List, Card } from '../models/index.js';
import { handleError } from '../utils/errorHandler.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Add card to list
router.post('/:listId/cards', authenticate, async (req, res) => {
  const { listId } = req.params;
  const { title } = req.body;

  dbLogger.log('Received card creation request:', {
    listId,
    title,
    userId: req.user.id
  });

  if (!title?.trim()) {
    dbLogger.warn('Invalid card creation request: Missing title');
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Card title is required'
    });
  }

  try {
    // Verify list exists and belongs to user's company
    const list = await List.findOne({
      where: { id: listId }
    });

    if (!list) {
      dbLogger.warn('List not found:', listId);
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'List not found'
      });
    }

    // Get max position for cards in this list
    const maxPosition = await Card.max('position', {
      where: { list_id: listId }
    }) || -1;

    dbLogger.log('Creating new card:', {
      title,
      listId,
      position: maxPosition + 1
    });

    const card = await Card.create({
      title: title.trim(),
      list_id: listId,
      position: maxPosition + 1
    });

    dbLogger.log('Card created successfully:', card.id);

    // Fetch the created card with associations
    const createdCard = await Card.findByPk(card.id, {
      include: ['Labels', 'Comments']
    });

    res.status(201).json(createdCard);
  } catch (error) {
    dbLogger.error('Failed to create card:', error);
    handleError(res, error);
  }
});

export default router;