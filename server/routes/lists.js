import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { List, Card } from '../models/index.js';
import { handleError } from '../utils/errorHandler.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

// Add card to list
router.post('/:listId/cards', authenticate, async (req, res) => {
  const { listId } = req.params;
  const { title, description } = req.body;

  try {
    // Verify list exists
    const list = await List.findByPk(listId);
    if (!list) {
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
      description: description?.trim(),
      list_id: listId,
      position: maxPosition + 1
    });

    res.status(201).json(card);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;