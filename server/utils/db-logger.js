// Custom database logger utility
const dbLogger = {
  log: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Database]:', ...args);
    }
  },
  error: (...args) => {
    console.error('[Database Error]:', ...args);
  },
  warn: (...args) => {
    console.warn('[Database Warning]:', ...args);
  },
  debug: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Database Debug]:', ...args);
    }
  }
};

export default dbLogger;