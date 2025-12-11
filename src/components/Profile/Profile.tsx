'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getUserData, resetCourseProgress } from '@/services/api/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCourseProgress,
  clearStorageTokens,
} from '@/store/features/authSlice';
import { setCurrentCourse } from '@/store/features/courseSlice';
import { setUtilityLoading } from '@/store/features/utilitySlice';

import SelectWorkout from '../SelectWorkout/SelectWorkout';
import Header from '../Header/Header';
import CourseItem from '../CourseItem/CourseItem';
import CourseItemSkeleton from '../CourseItem/CourseItemSkeleton';

import { CourseItemInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './profile.module.css';

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);
  const { allCourses, allWorkouts, currentCourse } = useAppSelector(
    (state) => state.courses,
  );
  const { loading, error } = useAppSelector((state) => state.utilities);

  const [isOpenSelection, setIsOpenSelection] = useState<boolean>(false);
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState<boolean>(false);

  const addedCourses: CourseItemInterface[] = allCourses.filter((courseEl) =>
    user.selectedCourses.includes(courseEl._id),
  );
  const coursesProgress = user.courseProgress.filter((courseProgressEl) =>
    user.selectedCourses.includes(courseProgressEl.courseId),
  );

  function userLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(clearStorageTokens());
    router.push('/main');
  }

  async function onClickResetCourseProgress(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setUtilityLoading(true));

    try {
      if (currentCourse) {
        const resultOfReset = await resetCourseProgress(
          currentCourse._id,
          user.token,
        );

        toast.success(resultOfReset.message);
      }

      getUserData(user.token).then((response) => {
        dispatch(setCourseProgress(response.courseProgress));
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Функционал временно недоступен, попробуйте позже');
        }
      }
    } finally {
      dispatch(setUtilityLoading(false));
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {isOpenSelection ? (
        <>
          <div
            className={styles.workoutSelection__popupListener}
            onClick={() => {
              setIsOpenSelection(false);
              dispatch(setCurrentCourse(null));
            }}
          ></div>

          <SelectWorkout
            courseWorkouts={
              allWorkouts.find(
                (courseWorkoutsList) =>
                  courseWorkoutsList.courseId === currentCourse?._id,
              ) || error
            }
            courseProgress={
              coursesProgress.find(
                (progressWorkouts) =>
                  progressWorkouts.courseId === currentCourse?._id,
              ) || error
            }
          />
        </>
      ) : (
        ''
      )}

      {isOpenConfirmPopup ? (
        <>
          <div
            className={styles.confirmPopup__popupListener}
            onClick={() => {
              setIsOpenConfirmPopup(false);
              dispatch(setCurrentCourse(null));
            }}
          ></div>

          <div className={styles.confirmPopup__container}>
            <h2 className={styles.confirmPopup__title}>
              Удалить весь прогресс по курсу?
            </h2>

            <div className={styles.confirmPopup__svgContainer}>
              <button
                className={styles.confirmPopup__confirmBtn}
                disabled={loading}
                onClick={(event) => {
                  onClickResetCourseProgress(event);
                  setIsOpenConfirmPopup(false);
                  dispatch(setCurrentCourse(null));
                }}
              >
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
              </button>

              <svg
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsOpenConfirmPopup(false);
                  dispatch(setCurrentCourse(null));
                }}
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M203 560 c-164 -54 -241 -238 -166 -398 50 -106 188 -176 301 -153 111 22 197 100 228 208 62 213 -149 412 -363 343z m142 -160 l55 54 32 -32 32 -32 -54 -55 -54 -55 52 -53 52 -53 -30 -29 -30 -29 -53 52 -53 52 -49 -50 c-27 -27 -54 -50 -59 -50 -13 0 -56 41 -56 54 0 6 23 33 50 61 l50 51 -50 49 c-27 27 -50 55 -50 61 0 7 12 22 27 34 l27 21 53 -53 53 -52 55 54z"
                  fill="#DB0030"
                  transform="translate(0.000000,58.000000) scale(0.100000,-0.100000)"
                />
              </svg>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      <Header withInscription={false} />

      <h2 className={styles.profile__title}>Профиль</h2>

      <div className={styles.profile__container}>
        <Image
          priority
          src={'/img/photo-profile.png'}
          alt="profile picture"
          width={197}
          height={197}
        />
        <div className={styles.profile__info}>
          <h3 className={styles.profile__username}>Логин: {user.email}</h3>

          <span className={styles.profile__login}>ID: {user.userId}</span>

          <button
            className={styles.profile__logoutBtn}
            disabled={loading}
            onClick={(event) => userLogout(event)}
          >
            Выйти
          </button>
        </div>
      </div>

      <h2 className={styles.profile__title}>Мои курсы</h2>

      <div className={styles.courses__container}>
        {loading ? (
          Array.from({ length: 6 }).map((item, index) => (
            <div key={index}>
              <CourseItemSkeleton withProgress={true} />
            </div>
          ))
        ) : error ? (
          <p className={styles.courses__message}>{error}</p>
        ) : addedCourses.length ? (
          addedCourses.map((courseItem) => (
            <CourseItem
              key={courseItem._id}
              courseItem={courseItem}
              withProgress={true}
              isAbleToAdd={false}
              courseWorkouts={allWorkouts.find(
                (courseWorkoutsList) =>
                  courseWorkoutsList.courseId === courseItem._id,
              )}
              workoutsPopUp={setIsOpenSelection}
              confirmPopup={setIsOpenConfirmPopup}
            />
          ))
        ) : (
          <p className={styles.courses__message}>Нет добавленных курсов</p>
        )}
      </div>

      <div className={styles.courses__anchorBtn_container}>
        <button className={styles.courses__anchorBtn}>
          <a href="#portalToTheTopOfThePage">Наверх ↑ </a>
        </button>
      </div>
    </div>
  );
}
