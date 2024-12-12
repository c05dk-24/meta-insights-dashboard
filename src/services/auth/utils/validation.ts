export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLoginInput = (email: string, password: string): string | null => {
  if (!email) return 'Email is required';
  if (!password) return 'Password is required';
  if (!validateEmail(email)) return 'Invalid email format';
  if (!validatePassword(password)) return 'Password must be at least 6 characters';
  return null;
};