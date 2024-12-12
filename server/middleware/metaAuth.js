import { metaConfig } from '../config/meta.js';
import dbLogger from '../utils/db-logger.js';

export const validateMetaToken = async (req, res, next) => {
  try {
    const { user } = req;
    
    if (!user?.meta_access_token) {
      return res.status(401).json({
        error: 'META_AUTH_REQUIRED',
        message: 'Meta authentication required'
      });
    }

    // Add Meta API version to request
    req.metaApiVersion = metaConfig.apiVersion;
    
    // Add Meta base URL to request
    req.metaGraphUrl = `${metaConfig.graphUrl}/${metaConfig.apiVersion}`;

    next();
  } catch (error) {
    dbLogger.error('Meta auth error:', error);
    res.status(500).json({
      error: 'META_AUTH_ERROR',
      message: 'Failed to validate Meta authentication'
    });
  }
};