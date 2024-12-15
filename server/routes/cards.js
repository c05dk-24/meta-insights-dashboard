import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Card, Comment, Checklist, Label, User } from '../models/index.js';
import { handleError } from '../utils/errorHandler.js';

const router = express.Router();

// Get card details
router.get('/:cardId', authenticate, async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.cardId, {
      include: [
        {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'name']
          }],
          order: [['created_at', 'DESC']]
        },
        {
          model: Checklist,
          order: [['position', 'ASC']]
        },
        {
          model: Label,
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    handleError(res, error);
  }
});

// Add label to card
router.post('/:cardId/labels/:labelId', authenticate, async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.cardId);
    const label = await Label.findByPk(req.params.labelId);

    if (!card || !label) {
      return res.status(404).json({ error: 'Card or label not found' });
    }

    await card.addLabel(label);
    res.status(201).json({ message: 'Label added successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

// Remove label from card
router.delete('/:cardId/labels/:labelId', authenticate, async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.cardId);
    const label = await Label.findByPk(req.params.labelId);

    if (!card || !label) {
      return res.status(404).json({ error: 'Card or label not found' });
    }

    await card.removeLabel(label);
    res.json({ message: 'Label removed successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

// Update card
router.put('/:cardId', authenticate, async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.cardId);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await card.update(req.body);
    
    // Fetch updated card with associations
    const updatedCard = await Card.findByPk(card.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'name'] }],
          order: [['created_at', 'DESC']]
        },
        {
          model: Checklist,
          order: [['position', 'ASC']]
        },
        {
          model: Label,
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json(updatedCard);
  } catch (error) {
    handleError(res, error);
  }
});

// Add comment
router.post('/:cardId/comments', authenticate, async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      card_id: req.params.cardId,
      user_id: req.user.id
    });

    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [{
        model: User,
        attributes: ['id', 'name']
      }]
    });

    res.status(201).json(commentWithUser);
  } catch (error) {
    handleError(res, error);
  }
});

// Add checklist item
router.post('/:cardId/checklist', authenticate, async (req, res) => {
  try {
    const maxPosition = await Checklist.max('position', {
      where: { card_id: req.params.cardId }
    }) || -1;

    const item = await Checklist.create({
      text: req.body.text,
      card_id: req.params.cardId,
      position: maxPosition + 1
    });

    res.status(201).json(item);
  } catch (error) {
    handleError(res, error);
  }
});

// Toggle checklist item
router.put('/:cardId/checklist/:itemId', authenticate, async (req, res) => {
  try {
    const item = await Checklist.findByPk(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: 'Checklist item not found' });
    }

    await item.update({ completed: !item.completed });
    res.json(item);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;