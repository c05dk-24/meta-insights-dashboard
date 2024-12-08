import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { getDateRange } from '../../utils/meta.js';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

// Fetch ad insights
router.get('/insights', authenticate, async (req, res) => {
  const { range, pageId } = req.query;

  try {
    dbLogger.log('Fetching Meta insights:', {
      range,
      pageId,
      userId: req.user.id
    });

    if (!pageId) {
      dbLogger.error('No Meta page ID provided');
      return res.status(400).json({ 
        error: 'META_PAGE_ID_MISSING',
        message: 'Meta page ID is required' 
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
      fields: "spend,impressions,reach,actions",
      time_range: JSON.stringify({ since: startDate, until: endDate }),
      access_token: process.env.META_ACCESS_TOKEN,
    };

    dbLogger.log('Making Meta API request:', {
      endpoint: `https://graph.facebook.com/v18.0/act_${pageId}/insights`,
      params
    });

    const response = await axios.get(
      `https://graph.facebook.com/v18.0/act_${pageId}/insights`,
      { params }
    );

    dbLogger.log('Meta API response:', response.data);

    // Transform the data
    const insights = response.data.data.reduce((acc, day) => ({
      impressions: (acc.impressions || 0) + parseInt(day.impressions || 0),
      reach: (acc.reach || 0) + parseInt(day.reach || 0),
      engagement: (acc.engagement || 0) + parseInt(day.actions?.[0]?.value || 0),
      clicks: (acc.clicks || 0) + parseInt(day.actions?.[1]?.value || 0),
    }), {});

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