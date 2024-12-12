import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import { User } from '../../models/index.js';
import { metaConfig } from '../../config/meta.js';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

// Get Meta auth URL
router.get('/url', authenticate, async (req, res) => {
  try {
    const authUrl = `https://www.facebook.com/v${metaConfig.apiVersion}/dialog/oauth?` +
      `client_id=${metaConfig.appId}&` +
      `redirect_uri=${encodeURIComponent(process.env.FRONTEND_URL + '/meta-callback')}&` +
      `scope=${metaConfig.requiredPermissions.join(',')}&` +
      `state=${req.user.id}`;

    res.json({ authUrl });
  } catch (error) {
    dbLogger.error('Meta auth URL error:', error);
    res.status(500).json({
      error: 'AUTH_URL_ERROR',
      message: 'Failed to generate Meta auth URL'
    });
  }
});

// Get Meta auth status
router.get('/status', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({
      isConnected: !!user?.meta_access_token,
      pageId: user?.meta_page_id
    });
  } catch (error) {
    dbLogger.error('Meta auth status error:', error);
    res.status(500).json({
      error: 'AUTH_STATUS_ERROR',
      message: 'Failed to get Meta auth status'
    });
  }
});

export default router;