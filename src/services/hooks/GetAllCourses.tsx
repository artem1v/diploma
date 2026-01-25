'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { getAllCourses } from '@/services/api/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAllCourses } from '@/store/features/courseSlice';
import {
  setUtilityLoading,
  setUtilityError,
} from '@/store/features/utilitySlice';

export default function GetAllCourses() {
  const dispatch = useAppDispatch();
  const { allCourses } = useAppSelector((state) => state.courses);

  useEffect(() => {
    // Проверяем сразу, чтобы не запускать эффект если курсы уже есть
    if (allCourses.length > 0) {
      return;
    }

    dispatch(setUtilityLoading(true));

    async function getCourses() {
      try {
        const coursesData = await getAllCourses();
        dispatch(setAllCourses(coursesData));
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

    getCourses();
  }, [dispatch, allCourses.length]);

  return <></>;
}