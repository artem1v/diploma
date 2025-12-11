'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { getWorkoutsList } from '@/services/api/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAllWorkouts } from '@/store/features/courseSlice';
import {
  setUtilityLoading,
  setUtilityError,
} from '@/store/features/utilitySlice';

import { WorkoutsStateInterface } from '@/sharedInterfaces/sharedInterfaces';

export default function useCoursesWorkouts() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (!user.token) return;

    dispatch(setUtilityLoading(true));

    async function getSelectedCoursesWorkoutsLists() {
      try {
        const сoursesWorkoutsPromises = user.selectedCourses.map(
          async (coursesId) => {
            const courseWorkouts = await getWorkoutsList(coursesId, user.token);

            return {
              courseId: coursesId,
              workoutsList: courseWorkouts,
            };
          },
        );

        const allWorkouts: WorkoutsStateInterface[] = await Promise.all(
          сoursesWorkoutsPromises,
        );

        dispatch(setAllWorkouts(allWorkouts));
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            dispatch(setUtilityError(error.response.data.message));
          } else {
            dispatch(setUtilityError('Не удалось получить список тренировок'));
          }
        }
      } finally {
        dispatch(setUtilityLoading(false));
      }
    }

    getSelectedCoursesWorkoutsLists();
  }, [user.selectedCourses, user.courseProgress]);

  return <></>;
}
