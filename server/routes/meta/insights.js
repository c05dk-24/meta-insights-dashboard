import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { getDateRange } from '../../utils/meta.js';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

// Get insights for a specific date range
router.get('/', authenticate, async (req, res) => {
  const { range, accountId } = req.query;

  try {
    if (!accountId) {
      return res.status(400).json({ 
        error: 'ACCOUNT_ID_MISSING',
        message: 'Meta account ID is required' 
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

    const response = await axios.get(`https://graph.facebook.com/v18.0/act_${accountId}/insights`, {
      params: {
        access_token: process.env.META_ACCESS_TOKEN,
        fields: 'impressions,reach,spend,actions',
        time_range: JSON.stringify({ since: startDate, until: endDate }),
        level: 'account'
      }
    });

    const insights = response.data.data[0] || {};
    const results = insights.actions?.find(a => a.action_type === 'onsite_conversion.lead')?.value || 0;
    const spend = parseFloat(insights.spend || 0);

    res.json({
      impressions: parseInt(insights.impressions || 0),
      reach: parseInt(insights.reach || 0),
      results,
      amountSpent: spend,
      costPerResult: results > 0 ? spend / results : 0
    });

  } catch (error) {
    dbLogger.error('Meta API error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      error: 'META_API_ERROR',
      message: error.response?.data?.error?.message || 'Failed to fetch insights'
    });
  }
});

// Get yearly insights data
router.get('/yearly', authenticate, async (req, res) => {
  const { accountId } = req.query;

  try {
    if (!accountId) {
      return res.status(400).json({ 
        error: 'ACCOUNT_ID_MISSING',
        message: 'Meta account ID is required' 
      });
    }

    const year = new Date().getFullYear();
    const startDate = `${year}-01-01`;
    const endDate = new Date().toISOString().split('T')[0];

    const response = await axios.get(`https://graph.facebook.com/v18.0/act_${accountId}/insights`, {
      params: {
        access_token: process.env.META_ACCESS_TOKEN,
        fields: 'impressions,reach,spend,actions',
        time_range: JSON.stringify({ since: startDate, until: endDate }),
        time_increment: 1,
        level: 'account'
      }
    });

    // Transform daily data into monthly aggregates
    const monthlyData = response.data.data.reduce((acc, day) => {
      const month = new Date(day.date_start).toLocaleString('default', { month: 'short' });
      const monthIndex = acc.findIndex(m => m.month === month);
      
      const results = day.actions?.find(a => a.action_type === 'onsite_conversion.lead')?.value || 0;
      const spend = parseFloat(day.spend || 0);

      if (monthIndex === -1) {
        acc.push({ 
          month, 
          results,
          amountSpent: spend,
          impressions: parseInt(day.impressions || 0),
          reach: parseInt(day.reach || 0)
        });
      } else {
        acc[monthIndex].results += results;
        acc[monthIndex].amountSpent += spend;
        acc[monthIndex].impressions += parseInt(day.impressions || 0);
        acc[monthIndex].reach += parseInt(day.reach || 0);
      }
      
      return acc;
    }, []);

    res.json(monthlyData);

  } catch (error) {
    dbLogger.error('Meta API error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      error: 'META_API_ERROR',
      message: error.response?.data?.error?.message || 'Failed to fetch yearly insights'
    });
  }
});

export default router;