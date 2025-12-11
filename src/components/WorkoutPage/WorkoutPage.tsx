'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Header from '../Header/Header';
import Progressbar from '../Progressbar/Progressbar';
import MarkWorkoutProgress from '../MarkWorkoutProgress/MarkWorkoutProgress';

import { useAppSelector } from '@/store/store';

import {
  WorkoutProgressInterface,
  WorkoutsStateInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import {
  workoutsNamesHelper,
  progressWorkoutNumberDefiner,
} from '@/services/utilities';

import styles from './workoutPage.module.css';

// {
//   coursesWorkouts,
// }: {
//   coursesWorkouts: WorkoutsStateInterface[];
// }

export default function WorkoutPage() {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.authentication);
  const { currentCourse, currentWorkout } = useAppSelector(
    (state) => state.courses,
  );

  const [isOpenProgressPopUp, setIsOpenProgressPopUp] =
    useState<boolean>(false);
  const [displayVideoError, setDisplayVideoError] = useState(false);

  const requiredExercisesQuantity: number[] | undefined =
    currentWorkout?.exercises.map((exercise) => exercise.quantity);

  const currentCourseWorkoutsProgress: WorkoutProgressInterface[] | undefined =
    user.courseProgress.find(
      (course) => course.courseId === currentCourse?._id,
    )?.workoutsProgress;

  const currentWorkoutExercisesProgress: WorkoutProgressInterface | undefined =
    currentCourseWorkoutsProgress?.find(
      (workout) => workout.workoutId === currentWorkout?._id,
    );

  const withExercises: number | undefined = currentWorkout?.exercises.length;
  const isCurrentWorkoutCompleted: boolean | undefined =
    currentWorkoutExercisesProgress?.workoutCompleted;

  const currentWorkoutName: string = currentWorkout?.name
    ? workoutsNamesHelper(currentWorkout?.name).length === 1
      ? workoutsNamesHelper(currentWorkout.name).toString()
      : workoutsNamesHelper(currentWorkout.name)[0]
    : '';

  let currentWorkoutNumber: number | undefined;
  if (currentWorkout) {
    currentWorkoutNumber = currentCourse?.workouts.indexOf(currentWorkout._id);
  }

  function workoutsProgressButtonHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    // if (!currentWorkout?.exercises.length) {
    //   router.push(`/profile`);
    // }

    setIsOpenProgressPopUp(true);
  }

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
            isCurrentWorkoutCompleted={isCurrentWorkoutCompleted || false}
            currentWorkoutExercisesProgress={currentWorkoutExercisesProgress}
            progressPopUp={setIsOpenProgressPopUp}
          />
        </>
      ) : (
        ''
      )}

      <Header withInscription={false} />

      <h1 className={styles.course__title}>{currentCourse?.nameRU}</h1>

      <iframe
        className={styles.workout__video}
        src={currentWorkout?.video}
        onError={() => {
          toast.warning('Ошибка при загрузке видео');
          setDisplayVideoError(true);
        }}
        title={
          currentWorkoutName ? currentWorkoutName : 'Workout video – YouTube'
        }
        allow="accelerometer; gyroscope; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>

      {displayVideoError ? (
        <div className={styles.workout__fallback_container}>
          <h3 className={styles.workout__fallback_title}>
            {currentWorkoutName
              ? currentWorkoutName
              : 'Workout video – YouTube'}
          </h3>
          <p className={styles.workout__fallback_message}>
            {`Ваш браузер не поддерживает видео или видео не загрузилось. `}
            <a
              className={styles.workout__fallback_link}
              href={currentWorkout?.video}
            >
              Смотреть на YouTube
            </a>
          </p>
        </div>
      ) : (
        ''
      )}

      <div className={styles.workouts__container}>
        <h2 className={styles.workout__title}>
          {`Упражнения тренировки ${typeof currentWorkoutNumber !== 'undefined' ? currentWorkoutNumber + 1 : ''}`}
        </h2>

        <div className={styles.workouts__wrapper}>
          {currentWorkout?.exercises && currentWorkout?.exercises.length > 0 ? (
            currentWorkout?.exercises.map((exercise, index) => {
              return (
                <div
                  key={exercise._id}
                  className={styles.workout__progressContainer}
                >
                  <p className={styles.workout__progressQuantity}>
                    {`${exercise.name.split(' (')[0]} ${
                      currentWorkoutExercisesProgress &&
                      requiredExercisesQuantity
                        ? Math.floor(
                            (currentWorkoutExercisesProgress.progressData[
                              index
                            ] /
                              requiredExercisesQuantity[index]) *
                              100,
                          )
                        : 0
                    }%`}
                  </p>

                  <Progressbar
                    value={
                      currentWorkoutExercisesProgress &&
                      requiredExercisesQuantity
                        ? Math.floor(
                            (currentWorkoutExercisesProgress.progressData[
                              index
                            ] /
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
          {isCurrentWorkoutCompleted
            ? 'Сбросить прогресс'
            : withExercises
              ? currentWorkoutExercisesProgress?.progressData?.reduce(
                  (sum, exerciseProgress) => sum + exerciseProgress,
                  0,
                )
                ? 'Обновить свой прогресс'
                : 'Заполнить свой прогресс'
              : 'Отметить выполнение'}
        </button>
      </div>
    </div>
  );
}
