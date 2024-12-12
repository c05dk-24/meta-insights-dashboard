import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { validateMetaToken } from '../../middleware/metaAuth.js';
import { User } from '../../models/index.js';
import dbLogger from '../../utils/db-logger.js';
import { metaConfig } from '../../config/meta.js';
import { getDateRange } from '../../utils/dateRanges.js';

const router = express.Router();

router.get('/', authenticate, validateMetaToken, async (req, res) => {
  try {
    const { range } = req.query;
    
    // Get user's Meta credentials
    const user = await User.findByPk(req.user.id);
    if (!user?.meta_page_id || !user?.meta_access_token) {
      return res.status(400).json({ 
        error: 'META_CREDENTIALS_MISSING',
        message: 'Meta credentials not found' 
      });
    }

    const { startDate, endDate } = getDateRange(range);
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        error: 'INVALID_DATE_RANGE',
        message: 'Invalid date range provided' 
      });
    }

    dbLogger.log('Fetching Meta insights:', {
      pageId: user.meta_page_id,
      startDate,
      endDate,
      range
    });

    // Call Meta Graph API
    const response = await axios.get(
      `${metaConfig.graphUrl}/${metaConfig.apiVersion}/${user.meta_page_id}/insights`,
      {
        params: {
          access_token: user.meta_access_token,
          fields: 'impressions,reach,actions,spend',
          time_range: JSON.stringify({
            since: startDate,
            until: endDate
          })
        }
      }
    );

    dbLogger.log('Meta API response:', response.data);
    res.json(response.data);
  } catch (error) {
    dbLogger.error('Meta insights error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      error: 'FETCH_ERROR',
      message: error.response?.data?.error?.message || 'Failed to fetch insights'
    });
  }
});

export default router;