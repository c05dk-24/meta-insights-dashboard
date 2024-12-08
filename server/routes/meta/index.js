import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import { MetaInsight } from '../../models/index.js';
import { getDateRange } from '../../utils/meta.js';
import axios from 'axios';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

router.get('/insights', authenticate, async (req, res) => {
  const { range } = req.query;

  try {
    if (!req.user.meta_page_id) {
      return res.status(400).json({ message: 'Meta page ID not configured' });
    }

    const { startDate, endDate } = getDateRange(range);
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    // Try to fetch from Facebook API
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v18.0/${req.user.meta_page_id}/insights`,
        {
          params: {
            metric: 'page_impressions,page_engaged_users,page_total_actions,page_views_total',
            period: 'day',
            since: startDate,
            until: endDate,
            access_token: process.env.FACEBOOK_ACCESS_TOKEN
          }
        }
      );

      // Transform and save insights
      const insights = response.data.data.reduce((acc, metric) => {
        const values = metric.values[0];
        switch (metric.name) {
          case 'page_impressions':
            acc.impressions = values.value;
            break;
          case 'page_engaged_users':
            acc.engagement = values.value;
            break;
          case 'page_total_actions':
            acc.clicks = values.value;
            break;
          case 'page_views_total':
            acc.reach = values.value;
            break;
        }
        return acc;
      }, {});

      // Save to database
      await MetaInsight.create({
        user_id: req.user.id,
        date: startDate,
        page_id: req.user.meta_page_id,
        ...insights
      });

      res.json(insights);
    } catch (apiError) {
      dbLogger.error('Facebook API error:', apiError);
      
      // Fallback to database
      const dbInsights = await MetaInsight.findOne({
        where: {
          user_id: req.user.id,
          date: startDate,
          page_id: req.user.meta_page_id
        }
      });

      if (dbInsights) {
        res.json(dbInsights);
      } else {
        throw new Error('No insights available');
      }
    }
  } catch (error) {
    dbLogger.error('Error fetching insights:', error);
    res.status(500).json({ message: 'Failed to fetch insights' });
  }
});

export default router;