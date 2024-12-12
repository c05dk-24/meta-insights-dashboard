import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { AppError } from '../utils/errorHandling';

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    console.error('Error caught:', error);

    if (error instanceof AppError) {
      toast.error(error.message);
      return;
    }

    if (error instanceof Error) {
      toast.error(error.message);
      return;
    }

    toast.error('An unexpected error occurred');
  }, []);

  return { handleError };
};