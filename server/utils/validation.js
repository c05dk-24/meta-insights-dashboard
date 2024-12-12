export const validateRequiredParams = (params, requiredFields) => {
  const missingFields = requiredFields.filter(field => !params[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required parameters: ${missingFields.join(', ')}`);
  }
  
  return true;
};

export const validateNumericParams = (params, numericFields) => {
  const invalidFields = numericFields.filter(field => {
    const value = params[field];
    return value && isNaN(Number(value));
  });
  
  if (invalidFields.length > 0) {
    throw new Error(`Invalid numeric values for: ${invalidFields.join(', ')}`);
  }
  
  return true;
};

export const sanitizeParams = (params, allowedFields) => {
  return Object.keys(params)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => ({
      ...obj,
      [key]: params[key]
    }), {});
};