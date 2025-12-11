'use client';

import classNames from 'classnames';
import { useState, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import {
  saveWorkoutProgress,
  getUserData,
  resetWorkoutProgress,
} from '@/services/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCourseProgress } from '@/store/features/authSlice';
import { setCurrentCourse } from '@/store/features/courseSlice';

import { WorkoutProgressInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './markWorkoutProgress.module.css';

export default function MarkWorkoutProgress({
  withExercises,
  isCurrentWorkoutCompleted,
  currentWorkoutExercisesProgress,
  progressPopUp,
}: {
  withExercises: number | undefined;
  isCurrentWorkoutCompleted: boolean;
  currentWorkoutExercisesProgress: WorkoutProgressInterface | undefined;
  progressPopUp?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);
  const { currentCourse, currentWorkout } = useAppSelector(
    (state) => state.courses,
  );

  const [exercisesProgress, setExercisesProgress] = useState<number[]>(
    currentWorkoutExercisesProgress?.progressData ||
      Array.from({ length: currentWorkout?.exercises.length || 0 }, () => 0),
  );

  const [progressMarkResult, setProgressMarkResult] = useState<boolean>(false);
  const [inputWithErrorId, setInputWithErrorId] = useState<number | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requiredExercisesQuantity: number[] | undefined =
    currentWorkout?.exercises.map((exercise) => exercise.quantity);

  function onWorkoutProgressInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInputWithErrorId(null);

    const currentInputId = parseInt(event.currentTarget.id);
    let currentInputValue: number;
    currentInputValue = parseInt(event.currentTarget.value);

    if (Number.isNaN(currentInputValue)) {
      currentInputValue = 0;
    }

    if (currentInputValue < 0) {
      toast.warning('Пожалуйста, введите положительное число');
      setInputWithErrorId(currentInputId);
      return;
    }

    setExercisesProgress((currentExercisesProgress) =>
      currentExercisesProgress.map((exerciseEl, index) =>
        currentInputId === index ? currentInputValue : exerciseEl,
      ),
    );
  }

  async function onClickSendWorkoutProgress(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    try {
      if (currentCourse && currentWorkout) {
        let resultMessage;

        if (isCurrentWorkoutCompleted) {
          resultMessage = await resetWorkoutProgress(
            currentCourse?._id,
            currentWorkout?._id,
            user.token,
          );
        } else {
          resultMessage = await saveWorkoutProgress(
            currentCourse?._id,
            currentWorkout?._id,
            exercisesProgress,
            user.token,
          );
        }

        toast.success(resultMessage.message);

        getUserData(user.token).then((response) => {
          dispatch(setCourseProgress(response.courseProgress));
        });

        setProgressMarkResult(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error('Проверьте интернет-соединение и попробуйте позже');
        } else {
          toast.error('Неизвестная ошибка');
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.markWorkoutProgress__container}>
      {progressMarkResult ? (
        <div className={styles.progressMarkResult__container}>
          <h2 className={styles.progressMarkResult__title}>
            Ваш прогресс засчитан!
          </h2>

          <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.0003 57.3332C44.6484 57.3332 57.3337 44.6479 57.3337 28.9998C57.3337 13.3518 44.6484 0.666504 29.0003 0.666504C13.3523 0.666504 0.666992 13.3518 0.666992 28.9998C0.666992 44.6479 13.3523 57.3332 29.0003 57.3332ZM28.7549 40.7467L44.3383 22.33L40.0124 18.6697L26.556 34.5727L18.8076 25.7174L14.543 29.4489L24.4597 40.7823C25.0031 41.4033 25.7903 41.7566 26.6155 41.7497C27.4407 41.7429 28.2219 41.3766 28.7549 40.7467Z"
              fill="#BCEC30"
            />
          </svg>
        </div>
      ) : (
        <>
          <h2 className={styles.markWorkoutProgress__title}>Мой прогресс</h2>

          {withExercises ? (
            <div className={styles.markWorkoutProgress__inputsContainer}>
              {currentWorkout?.exercises.map((exercise, index) => {
                return (
                  <div key={exercise._id}>
                    <label
                      className={styles.markWorkoutProgress__workoutLabel}
                      htmlFor={index.toString()}
                    >
                      {`Сколько раз вы сделали ${exercise.name.split(' (')[0].toLowerCase()}?`}
                    </label>

                    <input
                      className={classNames(
                        styles.markWorkoutProgress__workoutInput,
                        {
                          [styles.markWorkoutProgress__workoutInput_completedWorkout]:
                            currentWorkoutExercisesProgress &&
                            requiredExercisesQuantity
                              ? (currentWorkoutExercisesProgress.progressData[
                                  index
                                ] /
                                  requiredExercisesQuantity[index]) *
                                  100 >=
                                100
                              : false,
                          [styles.markWorkoutProgress__workoutInput_error]:
                            index === inputWithErrorId,
                        },
                      )}
                      type="number"
                      placeholder={`${currentWorkoutExercisesProgress?.progressData[index] || 0}`}
                      id={index.toString()}
                      name="WorkoutProgressItemInput"
                      onChange={(event) => onWorkoutProgressInputChange(event)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            ''
          )}

          {!withExercises ? (
            <div className={styles.markWorkoutProgress__demarcationContainer}>
              <p className={styles.markWorkoutProgress__demarcationMessage}>
                {currentWorkoutExercisesProgress?.workoutCompleted
                  ? 'Вы уже отметили выполнение данной тренировки'
                  : 'Вы ещё не отметили выполнение данной тренировки'}
              </p>
            </div>
          ) : (
            ''
          )}

          <button
            disabled={isLoading}
            className={classNames(styles.markWorkoutProgress__btnSendData, {
              [styles.markWorkoutProgress__btnSendData_inactive]: isLoading,
            })}
            onClick={(event) => {
              onClickSendWorkoutProgress(event);
            }}
          >
            {isCurrentWorkoutCompleted
              ? 'Сбросить прогресс по тренировке'
              : withExercises
                ? 'Сохранить'
                : 'Отметить выполнение'}
          </button>
        </>
      )}
    </div>
  );
}
