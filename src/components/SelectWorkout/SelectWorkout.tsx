'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setisOpenPopup, setUserId } from '@/store/features/authSlice';
import {
  setCurrentCourse,
  setCurrentWorkout,
} from '@/store/features/courseSlice';

import {
  WorkoutsStateInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import {
  progressWorkoutNumberDefiner,
  workoutsNamesHelper,
} from '@/services/utilities';

import styles from './selectWorkout.module.css';

export default function SelectWorkout({
  courseWorkouts,
  courseProgress,
}: {
  courseWorkouts: WorkoutsStateInterface | string;
  courseProgress: CourseProgressInterface | string;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);
  const { allCourses } = useAppSelector((state) => state.courses);

  const [chosenWorkoutId, setChosenWorkoutId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onClickSetWorkoutId(event: React.ChangeEvent<HTMLInputElement>) {
    setChosenWorkoutId(event.target.id);
  }

  function getOnWorkoutPage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.stopPropagation();
    event.preventDefault();

    let currentWorkout;
    if (typeof courseWorkouts !== 'string') {
      currentWorkout = courseWorkouts.workoutsList.find(
        (workout) => workout._id === chosenWorkoutId,
      );
    }

    if (chosenWorkoutId && currentWorkout) {
      dispatch(setCurrentWorkout(currentWorkout));
      router.push(`/workout/${chosenWorkoutId}`);

      return;
    }

    toast.info('Пожалуйста, выберите тренировку');
  }

  return (
    <div className={styles.workoutSelection__container}>
      <h2 className={styles.workoutSelection__title}>Выберите тренировку</h2>

      <ul className={styles.workoutSelection__workoutsContainer}>
        {typeof courseWorkouts === 'string'
          ? courseWorkouts
          : courseWorkouts.workoutsList.map((workout) => {
              return (
                <div
                  key={workout._id}
                  // onClick={(event) => {
                  //   onClickSetWorkoutId(event);
                  // }}
                >
                  <li className={styles.workoutSelection__workoutItem}>
                    <input
                      className={styles.workoutItem__input}
                      // value={'yes'}
                      // checked={workout._id === chosenWorkoutId}
                      type="radio"
                      id={workout._id}
                      name="isWorkoutComplete"
                      // onClick={(event) => {
                      //   onClickSetWorkoutId(event);
                      // }}
                      onChange={onClickSetWorkoutId}
                    />
                    <label
                      className={classNames(styles.workoutItem__label, {
                        [styles.workoutItem__label_completedWorkout]:
                          // Math.round(Math.random()),

                          typeof courseProgress === 'string'
                            ? false
                            : courseProgress.workoutsProgress
                              ? courseProgress.workoutsProgress.find(
                                  (workoutProgress) =>
                                    workoutProgress.workoutId === workout._id,
                                )?.workoutCompleted
                              : false,
                      })}
                      htmlFor={workout._id}
                    ></label>
                    {workoutsNamesHelper(workout.name).length === 1 ? (
                      <h4 className={styles.workoutItem__title}>
                        {workoutsNamesHelper(workout.name)}
                      </h4>
                    ) : (
                      <div className={styles.workoutItem__infoContainer}>
                        <h4 className={styles.workoutItem__title}>
                          {workoutsNamesHelper(workout.name)[0]}
                        </h4>
                        <span className={styles.workoutItem__description}>
                          {workoutsNamesHelper(workout.name)[1]}
                        </span>
                      </div>
                    )}
                  </li>

                  <div
                    className={
                      styles.workoutSelection__workoutItem_demarcationLine
                    }
                  ></div>
                </div>
              );
            })}
      </ul>

      <button
        disabled={isLoading}
        className={classNames(
          styles.workoutSelection__btnSendData,
          styles.workoutSelection__btnText,
          {
            [styles.workoutSelection__btnSendData_inactive]: isLoading,
            [styles.workoutSelection__btnText_inactive]: isLoading,
          },
        )}
        onClick={(event) => {
          getOnWorkoutPage(event);
        }}
      >
        Начать
      </button>
    </div>
  );
}
