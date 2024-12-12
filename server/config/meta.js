import dotenv from 'dotenv';

dotenv.config();

export const metaConfig = {
  appId: process.env.META_APP_ID,
  appSecret: process.env.META_APP_SECRET,
  apiVersion: process.env.META_API_VERSION || 'v18.0',
  graphUrl: 'https://graph.facebook.com',
  
  // Required scopes for the app
  requiredPermissions: [
    'read_insights',
    'ads_read',
    'pages_read_engagement'
  ]
};

// Validate required environment variables
const requiredEnvVars = ['META_APP_ID', 'META_APP_SECRET'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});