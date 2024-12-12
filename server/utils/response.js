export const successResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

export const errorResponse = (error, message = 'An error occurred') => ({
  success: false,
  message: message,
  error: error instanceof Error ? error.message : error
});

export const paginatedResponse = (data, page, limit, total) => ({
  success: true,
  data,
  pagination: {
    page: Number(page),
    limit: Number(limit),
    total: Number(total),
    totalPages: Math.ceil(total / limit)
  }
});