'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import {
  getUserData,
  getWorkoutsList,
  getCourseProgress,
} from '@/services/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setisOpenPopup,
  setUserId,
  setCourseProgress,
} from '@/store/features/authSlice';

import SelectWorkout from '../SelectWorkout/SelectWorkout';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import CourseItem from '../CourseItem/CourseItem';

import {
  CourseItemInterface,
  WorkoutsStateInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import styles from './profile.module.css';
import { setCurrentCourse } from '@/store/features/courseSlice';

export default function Profile() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);
  const { allCourses, currentCourse } = useAppSelector(
    (state) => state.courses,
  );

  const [isOpenSelection, setIsOpenSelection] = useState<boolean>(false);
  const [addedCourses, setAddedCourses] = useState<CourseItemInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [coursesWorkouts, setCoursesWorkouts] = useState<
    WorkoutsStateInterface[]
  >([]);
  const [coursesProgressState, setCourseProgressState] = useState<
    CourseProgressInterface[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // переименовать
    async function getSelectedCoursesAndUserProgress() {
      try {
        const userData = await getUserData(user.token);
        dispatch(setUserId(userData._id));
        dispatch(setCourseProgress(userData.courseProgress));

        const userSelection: CourseItemInterface[] = allCourses.filter(
          (course) => userData.selectedCourses.includes(course._id),
        );

        setAddedCourses(userSelection);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage('Курсы временно недоступны, попробуйте позже');
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    getSelectedCoursesAndUserProgress();
  }, [user.selectedCourses]);

  useEffect(() => {
    // переименовать
    async function getWorkoutsListOfSelectedCourses() {
      if (user.token) {
        try {
          const сoursesWorkoutsPromises = user.selectedCourses.map(
            async (coursesId) => {
              const courseWorkouts = await getWorkoutsList(
                coursesId,
                user.token,
              );

              return {
                courseId: coursesId,
                workoutsList: courseWorkouts,
              };
            },
          );

          const allWorkouts: WorkoutsStateInterface[] = await Promise.all(
            сoursesWorkoutsPromises,
          );
          setCoursesWorkouts(allWorkouts);

          const coursesProgressPromises = user.selectedCourses.map(
            async (coursesId) => {
              const courseProgress = await getCourseProgress(
                coursesId,
                user.token,
              );

              return courseProgress;
            },
          );
          const coursesProgress: CourseProgressInterface[] = await Promise.all(
            coursesProgressPromises,
          );
          setCourseProgressState(coursesProgress);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.warning(error.response.data.message);
            } else {
              toast.warning(
                'Функционал прогресса тренировок временно недоступен',
              );
            }
          }
        } finally {
          setIsLoading(false);
        }
      }
    }

    getWorkoutsListOfSelectedCourses();
  }, []);

  // useEffect(() => {
  //   console.log('coursesWorkouts:', coursesWorkouts);
  // }, [coursesWorkouts]);

  // useEffect(() => {
  //   console.log('courseProgress:', coursesProgressState);
  // }, [coursesProgressState]);

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
              coursesWorkouts.find(
                (courseWorkoutsList) =>
                  courseWorkoutsList.courseId === currentCourse?._id,
              ) || errorMessage
            }
            courseProgress={
              coursesProgressState.find(
                (progressWorkouts) =>
                  progressWorkouts.courseId === currentCourse?._id,
              ) || errorMessage
            }
          />
        </>
      ) : (
        ''
      )}

      {/* {isOpenPopup ? (
        <>
          <div
            className={styles.auth__popupListener}
            onClick={() => {
              dispatch(setisOpenPopup(!isOpenPopup));
            }}
          ></div>
          <Auth />
        </>
      ) : (
        ''
      )} */}

      <Header withInscription={false} />

      <h2 className={styles.profile__title}>Профиль</h2>

      <div className={styles.profile__container}>
        <Image
          src={'/img/photo-profile.png'}
          alt="profile picture"
          width={197}
          height={197}
        />
        <div className={styles.profile__info}>
          <h3 className={styles.profile__username}>Логин: {user.email}</h3>

          <span className={styles.profile__login}>ID: {user.userId}</span>

          <button className={styles.profile__logoutBtn}>Выйти</button>
        </div>
      </div>

      <h2 className={styles.profile__title}>Мои курсы</h2>

      <div className={styles.courses__container}>
        {isLoading ? (
          <div>Загрузка курсов...</div>
        ) : errorMessage ? (
          errorMessage
        ) : (
          addedCourses.map((courseItem) => (
            <CourseItem
              key={courseItem._id}
              courseItem={courseItem}
              withProgress={true}
              isAbleToAdd={false}
              courseWorkouts={coursesWorkouts.find(
                (courseWorkoutsList) =>
                  courseWorkoutsList.courseId === courseItem._id,
              )}
              progressWorkouts={coursesProgressState.find(
                (progressWorkouts) =>
                  progressWorkouts.courseId === courseItem._id,
              )}
              workoutsPopUp={setIsOpenSelection}
            />
          ))
        )}
      </div>
    </div>
  );
}
