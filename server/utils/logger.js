const logLevels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

const getTimestamp = () => new Date().toISOString();

const formatMessage = (level, message, meta = {}) => {
  return {
    timestamp: getTimestamp(),
    level,
    message,
    ...meta
  };
};

export const logger = {
  error: (message, meta) => {
    console.error(JSON.stringify(formatMessage(logLevels.ERROR, message, meta)));
  },
  
  warn: (message, meta) => {
    console.warn(JSON.stringify(formatMessage(logLevels.WARN, message, meta)));
  },
  
  info: (message, meta) => {
    console.log(JSON.stringify(formatMessage(logLevels.INFO, message, meta)));
  },
  
  debug: (message, meta) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(JSON.stringify(formatMessage(logLevels.DEBUG, message, meta)));
    }
  }
};