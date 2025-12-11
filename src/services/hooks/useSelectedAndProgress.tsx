'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { getUserData } from '@/services/api/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setSelectedCourses,
  setCourseProgress,
} from '@/store/features/authSlice';

import {
  setUtilityLoading,
  setUtilityError,
} from '@/store/features/utilitySlice';

export default function useSelectedAndProgress() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (!user.token) return;

    dispatch(setUtilityLoading(true));

    async function getSelectedAndProgress() {
      try {
        const userData = await getUserData(user.token);

        dispatch(setSelectedCourses(userData.selectedCourses));
        dispatch(setCourseProgress(userData.courseProgress));
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            dispatch(setUtilityError(error.response.data.message));
          } else {
            dispatch(
              setUtilityError('Курсы временно недоступны, попробуйте позже'),
            );
          }
        }
      } finally {
        dispatch(setUtilityLoading(false));
      }
    }

    getSelectedAndProgress();
  }, [user.token]);

  return <></>;
}
