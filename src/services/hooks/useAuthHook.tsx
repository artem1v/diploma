import { useEffect } from 'react';

import { useAppDispatch } from '@/store/store';
import {
  setUserId,
  setStorageLogin,
  setStorageToken,
} from '@/store/features/authSlice';

export function useAuthHook() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    const email = localStorage.getItem('email') || '';
    const token = localStorage.getItem('token') || '';

    dispatch(setUserId(userId));
    dispatch(setStorageLogin(email));
    dispatch(setStorageToken(token));
  }, [dispatch]);
}
