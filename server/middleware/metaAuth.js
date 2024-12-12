import { User } from '../models/index.js';
import { metaConfig } from '../config/meta.js';
import dbLogger from '../utils/db-logger.js';

export const validateMetaToken = async (req, res, next) => {
  try {
    // Get full user data from database
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(401).json({
        error: 'USER_NOT_FOUND',
        message: 'User not found'
      });
    }

    if (!user.meta_access_token || !user.meta_page_id) {
      dbLogger.warn(`Meta credentials missing for user ${user.id}`);
      return res.status(401).json({
        error: 'META_AUTH_REQUIRED',
        message: 'Meta authentication required',
        authUrl: `https://www.facebook.com/v${metaConfig.apiVersion}/dialog/oauth?` +
          `client_id=${metaConfig.appId}&` +
          `redirect_uri=${encodeURIComponent(process.env.FRONTEND_URL + '/meta-callback')}&` +
          `scope=${metaConfig.requiredPermissions.join(',')}&` +
          `state=${user.id}`
      });
    }

    // Add Meta credentials to request
    req.metaCredentials = {
      accessToken: user.meta_access_token,
      pageId: user.meta_page_id,
      apiVersion: metaConfig.apiVersion,
      graphUrl: metaConfig.graphUrl
    };

    next();
  } catch (error) {
    dbLogger.error('Meta auth validation error:', error);
    res.status(500).json({
      error: 'META_AUTH_ERROR',
      message: 'Failed to validate Meta authentication'
    });
  }
};