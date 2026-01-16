import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLoading, setUser, setError, logout as logoutAction } from './authSlice';
import type { User } from '../../types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const logout = useCallback(async () => {
    try {
      dispatch(logoutAction());
      // Add Firebase logout here
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Logout failed'));
    }
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    logout,
  };
};
