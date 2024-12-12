import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { validateMetaToken } from '../../middleware/metaAuth.js';
import { User } from '../../models/index.js';
import dbLogger from '../../utils/db-logger.js';
import { metaConfig } from '../../config/meta.js';

const router = express.Router();

router.get('/', authenticate, validateMetaToken, async (req, res) => {
  try {
    const { start_date, end_date, fields } = req.query;
    
    // Get user's Meta credentials
    const user = await User.findByPk(req.user.id);
    if (!user?.meta_page_id) {
      return res.status(400).json({ 
        error: 'META_PAGE_ID_MISSING',
        message: 'Meta page ID not found' 
      });
    }

    dbLogger.log('Fetching Meta insights:', {
      pageId: user.meta_page_id,
      startDate: start_date,
      endDate: end_date
    });

    // Call Meta Graph API
    const response = await axios.get(
      `${metaConfig.graphUrl}/${metaConfig.apiVersion}/${user.meta_page_id}/insights`,
      {
        params: {
          access_token: user.meta_access_token,
          fields,
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
    dbLogger.error('Meta insights error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      error: 'FETCH_ERROR',
      message: error.response?.data?.error?.message || 'Failed to fetch insights'
    });
  }
});

export default router;