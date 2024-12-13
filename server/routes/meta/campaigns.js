import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { User } from '../../models/index.js';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    // Get user's Meta credentials
    const user = await User.findByPk(req.user.id);
    if (!user?.meta_page_id || !user?.meta_access_token) {
      return res.status(400).json({ 
        error: 'META_CREDENTIALS_MISSING',
        message: 'Meta credentials not found' 
      });
    }

    // Call Meta Graph API
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/act_${user.meta_page_id}/campaigns`,
      {
        params: {
          access_token: user.meta_access_token,
          fields: 'campaign_id,campaign_name,objective,status,insights{impressions,reach,actions,spend}',
          time_range: JSON.stringify({
            since: start_date,
            until: end_date
          })
        }
      }
    );

    dbLogger.log('Meta API response:', response.data);
    res.json(response.data);
  } catch (error) {
    dbLogger.error('Meta campaigns error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      error: 'FETCH_ERROR',
      message: error.response?.data?.error?.message || 'Failed to fetch campaigns'
    });
  }
});

export default router;