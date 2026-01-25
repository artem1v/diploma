'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import Header from '../Header/Header';
import Progressbar from '../Progressbar/Progressbar';
import MarkWorkoutProgress from '../MarkWorkoutProgress/MarkWorkoutProgress';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentCourse,
  setCurrentWorkout,
} from '@/store/features/courseSlice';

import {
  CourseItemInterface,
  WorkoutsListInterface,
  WorkoutProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import { workoutsNamesHelper } from '@/services/utilities';

import styles from './workoutPage.module.css';

export default function WorkoutPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);
  const { allCourses, allWorkouts, currentCourse, currentWorkout } =
    useAppSelector((state) => state.courses);

  const [isOpenProgressPopUp, setIsOpenProgressPopUp] =
    useState<boolean>(false);
  const [displayVideoError, setDisplayVideoError] = useState<boolean>(false);

  const course: CourseItemInterface | undefined = currentCourse
    ? currentCourse
    : allCourses.find((courseEl) => courseEl.workouts.includes(params.id));

  const workout: WorkoutsListInterface | undefined = currentWorkout
    ? currentWorkout
    : allWorkouts
        .find((workoutsEl) =>
          workoutsEl.workoutsList.find(
            (workoutEl) => workoutEl._id === params.id,
          ),
        )
        ?.workoutsList.find((workoutEl) => workoutEl._id === params.id);

  const requiredExercisesQuantity: number[] | undefined =
    workout?.exercises.map((exerciseEl) => exerciseEl.quantity);

  const workoutsProgress: WorkoutProgressInterface[] | undefined =
    user.courseProgress.find(
      (courseEl) => courseEl.courseId === course?._id,
    )?.workoutsProgress;

  const workoutExercisesProgress: WorkoutProgressInterface | undefined =
    workoutsProgress?.find((workoutEl) => workoutEl.workoutId === workout?._id);

  const withExercises: number | undefined = workout?.exercises.length;
  const isWorkoutCompleted: boolean | undefined =
    workoutExercisesProgress?.workoutCompleted;

  const workoutName: string = workout?.name
    ? workoutsNamesHelper(workout?.name).length === 1
      ? workoutsNamesHelper(workout.name).toString()
      : workoutsNamesHelper(workout.name)[0]
    : '';

  let workoutNumber: number | undefined;
  if (workout) {
    workoutNumber = course?.workouts.indexOf(workout._id);
  }

  function workoutsProgressButtonHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setIsOpenProgressPopUp(true);
  }

  useEffect(() => {
    if (!currentCourse && course) {
      dispatch(setCurrentCourse(course));
    }

    if (!currentWorkout && workout) {
      dispatch(setCurrentWorkout(workout));
    }
  }, [course, currentCourse, currentWorkout, dispatch, workout]);

  return (
    <div style={{ position: 'relative' }}>
      {isOpenProgressPopUp ? (
        <>
          <div
            className={styles.workoutProgress__popupListener}
            onClick={() => {
              setIsOpenProgressPopUp(false);
            }}
          ></div>

          <MarkWorkoutProgress
            withExercises={withExercises}
            isWorkoutCompleted={isWorkoutCompleted || false}
            workoutExercisesProgress={workoutExercisesProgress}
          />
        </>
      ) : (
        ''
      )}

      <Header withInscription={false} />

      <h1 className={styles.course__title}>{course?.nameRU}</h1>
      <div className={styles.workout__video_container}>
        <iframe
          className={styles.workout__video}
          src={workout?.video}
          onError={() => {
            toast.warning('Ошибка при загрузке видео');
            setDisplayVideoError(true);
          }}
          title={workoutName ? workoutName : 'Workout video – YouTube'}
          allow="accelerometer; gyroscope; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {displayVideoError ? (
        <div className={styles.workout__fallback_container}>
          <h3 className={styles.workout__fallback_title}>
            {workoutName ? workoutName : 'Workout video – YouTube'}
          </h3>
          <p className={styles.workout__fallback_message}>
            {`Ваш браузер не поддерживает видео или видео не загрузилось. `}
            <a className={styles.workout__fallback_link} href={workout?.video}>
              Смотреть на YouTube
            </a>
          </p>
        </div>
      ) : (
        ''
      )}

      <div className={styles.workouts__container_center}>
        <div className={styles.workouts__container}>
          <h2 className={styles.workout__title}>
            {`Упражнения тренировки ${typeof workoutNumber !== 'undefined' ? workoutNumber + 1 : ''}`}
          </h2>

          <div className={styles.workouts__wrapper}>
            {workout?.exercises && withExercises ? (
              workout?.exercises.map((exercise, index) => {
                return (
                  <div
                    key={exercise._id}
                    className={styles.workout__progressContainer}
                  >
                    <p className={styles.workout__progressQuantity}>
                      {`${exercise.name.split(' (')[0]} ${
                        workoutExercisesProgress && requiredExercisesQuantity
                          ? Math.floor(
                              (workoutExercisesProgress.progressData[index] /
                                requiredExercisesQuantity[index]) *
                                100,
                            )
                          : 0
                      }%`}
                    </p>

                    <Progressbar
                      value={
                        workoutExercisesProgress && requiredExercisesQuantity
                          ? Math.floor(
                              (workoutExercisesProgress.progressData[index] /
                                requiredExercisesQuantity[index]) *
                                100,
                            )
                          : 0
                      }
                    />
                  </div>
                );
              })
            ) : (
              <p className={styles.workout__withoutProgress}>
                В данной тренировке нет упражнений, требующих заполнить прогресс
              </p>
            )}
          </div>

          <button
            className={styles.workouts__progressBtn}
            onClick={(event) => {
              workoutsProgressButtonHandler(event);
            }}
          >
            {isWorkoutCompleted
              ? 'Сбросить прогресс'
              : withExercises
                ? workoutExercisesProgress?.progressData?.reduce(
                    (sum, exerciseProgress) => sum + exerciseProgress,
                    0,
                  )
                  ? 'Обновить свой прогресс'
                  : 'Заполнить свой прогресс'
                : 'Отметить выполнение'}
          </button>
        </div>
      </div>
    </div>
  );
}
