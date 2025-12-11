'use client';

import classNames from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentWorkout } from '@/store/features/courseSlice';

import {
  WorkoutsStateInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import { workoutsNamesHelper } from '@/services/utilities';

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

  const { loading } = useAppSelector((state) => state.utilities);

  const [chosenWorkoutId, setChosenWorkoutId] = useState<string>('');

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
      router.push(`/main/workout/${chosenWorkoutId}`);

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
                <div key={workout._id}>
                  <li className={styles.workoutSelection__workoutItem}>
                    <input
                      className={styles.workoutItem__input}
                      type="radio"
                      id={workout._id}
                      name="isWorkoutComplete"
                      onChange={onClickSetWorkoutId}
                    />
                    <label
                      className={classNames(styles.workoutItem__label, {
                        [styles.workoutItem__label_completedWorkout]:
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
        disabled={loading}
        className={classNames(styles.workoutSelection__btnSendData, {
          [styles.workoutSelection__btnSendData_inactive]: loading,
        })}
        onClick={(event) => {
          getOnWorkoutPage(event);
        }}
      >
        Начать
      </button>
    </div>
  );
}
