import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from './useAuth';

export const useSupabase = () => {
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (user) {
      // Set up Supabase auth state
      supabase.auth.setSession({
        access_token: user.token,
        refresh_token: ''
      });
      setIsReady(true);
    }
  }, [user]);

  return {
    supabase,
    isReady
  };
};