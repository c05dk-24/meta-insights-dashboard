import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { getDateRange } from '../../utils/meta.js';
import { User } from '../../models/index.js';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

router.get('/insights', authenticate, async (req, res) => {
  const { range } = req.query;

  try {
    const user = await User.findByPk(req.user.id);
    
    dbLogger.log('Fetching Meta insights:', {
      range,
      userId: req.user.id,
      metaPageId: user?.meta_page_id
    });

    if (!user?.meta_page_id) {
      dbLogger.error('No Meta page ID found for user:', req.user.id);
      return res.status(400).json({ 
        error: 'META_PAGE_ID_MISSING',
        message: 'Meta page ID not found for user' 
      });
    }

    const { startDate, endDate } = getDateRange(range);
    
    if (!startDate || !endDate) {
      dbLogger.error('Invalid date range:', range);
      return res.status(400).json({ 
        error: 'INVALID_DATE_RANGE',
        message: 'Invalid date range provided' 
      });
    }

    const params = {
      fields: "impressions,actions,action_values,spend",
      time_range: JSON.stringify({ since: startDate, until: endDate }),
      access_token: process.env.META_ACCESS_TOKEN,
    };

    const accountId = user.meta_page_id.replace(/^act_/, '');
    const endpoint = `https://graph.facebook.com/v18.0/act_${accountId}/insights`;

    dbLogger.log('Making Meta API request:', {
      endpoint,
      params
    });

    const response = await axios.get(endpoint, { params });

    dbLogger.log('Meta API response:', response.data);

    // Transform the data
    const insights = response.data.data.reduce((acc, day) => {
      const results = parseInt(day.actions?.[0]?.value || 0);
      const amountSpent = parseFloat(day.spend || 0);
      
      return {
        impressions: (acc.impressions || 0) + parseInt(day.impressions || 0),
        results: (acc.results || 0) + results,
        amountSpent: (acc.amountSpent || 0) + amountSpent,
        costPerResult: results ? amountSpent / results : 0
      };
    }, {});

    dbLogger.log('Transformed insights:', insights);
    res.status(200).json(insights);
  } catch (error) {
    dbLogger.error('Error fetching Meta insights:', error.response?.data || error);
    res.status(error.response?.status || 500).json({ 
      error: 'FETCH_ERROR',
      message: 'Failed to fetch Meta insights',
      details: error.response?.data || error.message
    });
  }
});

export default router;