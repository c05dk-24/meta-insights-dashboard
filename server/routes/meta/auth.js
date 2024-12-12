import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { User } from '../../models/index.js';
import { metaConfig } from '../../config/meta.js';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

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

// Exchange code for access token
router.post('/token', authenticate, async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({
        error: 'INVALID_REQUEST',
        message: 'Authorization code is required'
      });
    }

    // Exchange code for access token
    const tokenResponse = await axios.get(
      `${metaConfig.graphUrl}/oauth/access_token`,
      {
        params: {
          client_id: metaConfig.appId,
          client_secret: metaConfig.appSecret,
          redirect_uri: `${process.env.FRONTEND_URL}/meta-callback`,
          code
        }
      }
    );

    const { access_token } = tokenResponse.data;

    // Get user's pages
    const pagesResponse = await axios.get(
      `${metaConfig.graphUrl}/${metaConfig.apiVersion}/me/accounts`,
      {
        params: {
          access_token,
          fields: 'id,name,access_token'
        }
      }
    );

    // Use the first page's access token and ID
    const page = pagesResponse.data.data[0];
    if (!page) {
      throw new Error('No Facebook pages found');
    }

    // Update user with Meta credentials
    await User.update(
      {
        meta_access_token: page.access_token,
        meta_page_id: page.id
      },
      {
        where: { id: req.user.id }
      }
    );

    res.json({
      success: true,
      pageId: page.id
    });
  } catch (error) {
    dbLogger.error('Meta token exchange error:', error.response?.data || error);
    res.status(500).json({
      error: 'TOKEN_EXCHANGE_ERROR',
      message: 'Failed to exchange authorization code'
    });
  }
});

// Disconnect Meta account
router.post('/disconnect', authenticate, async (req, res) => {
  try {
    await User.update(
      {
        meta_access_token: null,
        meta_page_id: null
      },
      {
        where: { id: req.user.id }
      }
    );

    res.json({ success: true });
  } catch (error) {
    dbLogger.error('Meta disconnect error:', error);
    res.status(500).json({
      error: 'DISCONNECT_ERROR',
      message: 'Failed to disconnect Meta account'
    });
  }
});

export default router;