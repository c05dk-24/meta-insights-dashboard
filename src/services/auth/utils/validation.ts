const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginInput = (email: string, password: string): string | null => {
  if (!email) return 'Email is required';
  if (!password) return 'Password is required';
  if (!EMAIL_REGEX.test(email)) return 'Invalid email format';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};