import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import { MetaInsight, User } from '../../models/index.js';
import { getDateRange } from '../../utils/meta.js';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const { range } = req.query;
    const { startDate, endDate } = getDateRange(range);

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    const insights = await MetaInsight.findAll({
      where: {
        user_id: req.user.id,
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['date', 'ASC']]
    });

    // Calculate totals and changes
    const totals = insights.reduce((acc, curr) => ({
      impressions: acc.impressions + curr.impressions,
      reach: acc.reach + curr.reach,
      engagement: acc.engagement + curr.engagement,
      clicks: acc.clicks + curr.clicks
    }), { impressions: 0, reach: 0, engagement: 0, clicks: 0 });

    res.json({
      insights,
      totals,
      period: { startDate, endDate }
    });
  } catch (error) {
    dbLogger.error('Error fetching insights:', error);
    res.status(500).json({ message: 'Failed to fetch insights' });
  }
});

export default router;