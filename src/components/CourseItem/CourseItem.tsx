'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, SetStateAction } from 'react';
import { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';
// import classNames from 'classnames';
import { toast } from 'react-toastify';

import { addCourse, removeCourse } from '@/services/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateSelectedCourses } from '@/store/features/authSlice';
import { setCurrentCourse } from '@/store/features/courseSlice';

import DifficultyItem from '../DifficultyItem/DifficultyItem';
import Progressbar from '../Progressbar/Progressbar';

import {
  CourseItemInterface,
  WorkoutsStateInterface,
  WorkoutProgressInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import { pictureDefiner, progressbarLevelDefiner } from '@/services/utilities';

import styles from './courseItem.module.css';

// className={classNames(
//               styles.course__infoDesign,
//               styles.course__durationInDays,
//             )}

export default function CourseItem({
  courseItem,
  withProgress,
  isAbleToAdd,
  courseWorkouts,
  workoutsPopUp,
}: {
  courseItem: CourseItemInterface;
  withProgress: boolean;
  isAbleToAdd: boolean;
  courseWorkouts?: WorkoutsStateInterface;
  progressWorkouts?: CourseProgressInterface;
  workoutsPopUp?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let progressbarLevel: number = 0;
  if (withProgress && courseWorkouts) {
    progressbarLevel = progressbarLevelDefiner(
      user.courseProgress,
      courseItem._id,
      courseWorkouts.workoutsList,
    );
  }

  function onClickSetCourse() {
    dispatch(setCurrentCourse(courseItem));
  }

  async function addRemoveCourse(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    if (!user.token) {
      toast.warning('Необходима авторизация. Войдите в аккаунт');
      setIsLoading(false);
      return;
    }

    const isAlreadySelected = user.selectedCourses.includes(courseItem._id);

    if (isAlreadySelected && pathname === '/main') {
      toast.info('Курс уже добавлен!');
      setIsLoading(false);
      return;
    }

    const usedFunction = isAlreadySelected ? removeCourse : addCourse;

    try {
      const resultOfAdding = await usedFunction(courseItem._id, user.token);

      toast.success(resultOfAdding);
      dispatch(updateSelectedCourses(courseItem._id));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Функционал временно недоступен, попробуйте позже');
        }
      }
    } finally {
      setIsLoading(false);
    }

    return;
  }

  return (
    <div className={styles.course}>
      <div className={styles.course__pictureContainer}>
        <Image
          src={pictureDefiner(courseItem.nameEN, 'item')}
          alt="course picture"
          width={360}
          height={325}
        />

        {isLoading ? (
          <div className={styles.add__loadingIcon}></div>
        ) : (
          <svg
            className={styles.add__icon}
            onClick={(event) => addRemoveCourse(event)}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={
                isAbleToAdd
                  ? 'M16 29.3333C23.3638 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63616 23.3638 2.66663 16 2.66663C8.63622 2.66663 2.66669 8.63616 2.66669 16C2.66669 23.3638 8.63622 29.3333 16 29.3333ZM14.6667 14.6666V9.33329H17.3334V14.6666H22.6667V17.3333H17.3334V22.6666H14.6667V17.3333H9.33335V14.6666H14.6667Z'
                  : 'M15.9998 29.3333C23.3636 29.3333 29.3332 23.3638 29.3332 16C29.3332 8.63616 23.3636 2.66663 15.9998 2.66663C8.63604 2.66663 2.6665 8.63616 2.6665 16C2.6665 23.3638 8.63604 29.3333 15.9998 29.3333ZM9.33317 14.6666V17.3333H22.6665V14.6666H9.33317Z'
              }
              fill="white"
            />
          </svg>
        )}
      </div>

      <div className={styles.course__infoContainer}>
        <Link onClick={onClickSetCourse} href={`/course/${courseItem._id}`}>
          <h3 className={styles.course__title}>{courseItem.nameRU}</h3>

          <div className={styles.course__infoWrapper}>
            <div className={styles.course__infoDesign}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 1.625C6.5 0.796573 5.82843 0.125 5 0.125C4.17157 0.125 3.5 0.796573 3.5 1.625C1.84315 1.625 0.5 2.96815 0.5 4.625H15.5C15.5 2.96815 14.1569 1.625 12.5 1.625C12.5 0.796573 11.8284 0.125 11 0.125C10.1716 0.125 9.5 0.796573 9.5 1.625H6.5Z"
                  fill="#202020"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.5 6.125H15.5V10.325C15.5 12.0052 15.5 12.8452 15.173 13.487C14.8854 14.0515 14.4265 14.5104 13.862 14.798C13.2202 15.125 12.3802 15.125 10.7 15.125H5.3C3.61984 15.125 2.77976 15.125 2.13803 14.798C1.57354 14.5104 1.1146 14.0515 0.82698 13.487C0.5 12.8452 0.5 12.0052 0.5 10.325V6.125ZM9.5 10.325C9.5 9.90496 9.5 9.69494 9.58175 9.53451C9.65365 9.39338 9.76838 9.27865 9.90951 9.20675C10.0699 9.125 10.28 9.125 10.7 9.125H11.3C11.72 9.125 11.9301 9.125 12.0905 9.20675C12.2316 9.27865 12.3463 9.39338 12.4183 9.53451C12.5 9.69494 12.5 9.90496 12.5 10.325V10.925C12.5 11.345 12.5 11.5551 12.4183 11.7155C12.3463 11.8566 12.2316 11.9713 12.0905 12.0433C11.9301 12.125 11.72 12.125 11.3 12.125H10.7C10.28 12.125 10.0699 12.125 9.90951 12.0433C9.76838 11.9713 9.65365 11.8566 9.58175 11.7155C9.5 11.5551 9.5 11.345 9.5 10.925V10.325Z"
                  fill="#202020"
                />
              </svg>

              <span>{courseItem.durationInDays} дней</span>
            </div>

            <div className={styles.course__infoDesign}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5ZM7.25 3.5V8C7.25 8.41421 7.58579 8.75 8 8.75H11.75V7.25H8.75V3.5H7.25Z"
                  fill="#202020"
                />
              </svg>

              <span>
                {courseItem.dailyDurationInMinutes.from}-
                {courseItem.dailyDurationInMinutes.to} мин/день
              </span>
            </div>

            <div className={styles.course__infoDesign}>
              <div className={styles.difficulty__container}>
                <DifficultyItem difficulty={courseItem.difficulty} />
              </div>

              <span>Сложность: {courseItem.difficulty}</span>
            </div>
          </div>

          {withProgress && courseWorkouts ? (
            <div className={styles.course__progressContainer}>
              <p className={styles.course__progressQuantity}>
                {`Прогресс ${progressbarLevel}%`}
              </p>

              <Progressbar value={progressbarLevel} />
            </div>
          ) : (
            ''
          )}
        </Link>

        {withProgress && courseWorkouts ? (
          <button
            className={styles.course__workoutsBtn}
            onClick={() => {
              onClickSetCourse();
              if (workoutsPopUp) {
                workoutsPopUp(true);
              }
            }}
          >
            {user.courseProgress.find(
              (courseEl) => courseEl.courseId === courseItem._id,
            )?.courseCompleted
              ? 'Начать заново'
              : progressbarLevel
                ? 'Продолжить'
                : 'Начать тренировки'}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
