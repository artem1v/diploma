'use client';

import { useEffect, useRef } from 'react'; // Добавляем useRef
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

  // Используем ref для отслеживания предыдущих выбранных курсов
  const prevSelectedCoursesRef = useRef<string[]>([]);

  useEffect(() => {
    if (!user.token) return;

    // Проверяем, действительно ли изменились выбранные курсы
    const selectedCoursesChanged =
      JSON.stringify(user.selectedCourses) !==
      JSON.stringify(prevSelectedCoursesRef.current);

    if (!selectedCoursesChanged) {
      return; // Не делаем запрос, если курсы не изменились
    }

    // Обновляем ref
    prevSelectedCoursesRef.current = user.selectedCourses;

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
  }, [user.selectedCourses, user.token]); // Убрали user.courseProgress из зависимостей

  return <></>;
}
