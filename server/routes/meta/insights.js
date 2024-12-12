import { getDateRange, validateDateRange } from '../../utils/dateRanges.js';
import { validateRequiredParams } from '../../utils/validation.js';
import { successResponse, errorResponse } from '../../utils/response.js';
import { logger } from '../../utils/logger.js';

export const getInsights = async (req, res) => {
  try {
    const { range, page_id } = req.query;
    
    validateRequiredParams(req.query, ['range', 'page_id']);
    
    const { startDate, endDate } = getDateRange(range);
    
    if (!validateDateRange(startDate, endDate)) {
      throw new Error('Invalid date range');
    }
    
    logger.info('Fetching insights', {
      pageId: page_id,
      range,
      startDate,
      endDate
    });

    // Your insights fetching logic here
    const insights = {/* ... */};

    return res.json(successResponse(insights));
  } catch (error) {
    logger.error('Error fetching insights', { error: error.message });
    return res.status(400).json(errorResponse(error));
  }
};