'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import {
  getAllCourses,
  getWorkoutsList,
  getCourseProgress,
} from '@/services/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAllCourses } from '@/store/features/courseSlice';

import Auth from '../Auth/Auth';
import Header from '@/components/Header/Header';
import CourseItem from '@/components/CourseItem/CourseItem';
import CourseItemSkeleton from '../CourseItem/CourseItemSkeleton';

import {
  CourseItemInterface,
  CourseProgressInterface,
  WorkoutsListInterface,
  WorkoutsStateInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import styles from './main.module.css';

export default function Main() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authentication);

  const [isOpenAuthPopup, setIsOpenAuthPopup] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseItemInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getCourses() {
      setIsLoading(true);

      try {
        const allCourses = await getAllCourses();
        dispatch(setAllCourses(allCourses));
        setCourses(allCourses);
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

    getCourses();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {isOpenAuthPopup ? (
        <>
          <div
            className={styles.auth__popupListener}
            onClick={() => {
              setIsOpenAuthPopup(false);
            }}
          ></div>
          <Auth authPopup={setIsOpenAuthPopup} />
        </>
      ) : (
        ''
      )}

      <Header withInscription={true} authPopup={setIsOpenAuthPopup} />

      <div className={styles.mainTitle__container}>
        <h1 className={styles.mainTitle__text}>
          Начните заниматься спортом
          <br />и улучшите качество жизни
        </h1>

        <div className={styles.slogan__container}>
          Измени своё
          <br />
          тело за полгода!
          <svg
            className={styles.slogan__textCallout}
            width="31"
            height="36"
            viewBox="0 0 31 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.31047 34.7255C1.70859 35.9972 -0.543649 34.3288 0.206143 32.4259L12.4832 1.26757C12.9654 0.043736 14.4775 -0.389332 15.5345 0.393651L29.4865 10.7288C30.5434 11.5118 30.5697 13.0844 29.5395 13.9023L3.31047 34.7255Z"
              fill="#BCEC30"
            />
          </svg>
        </div>
      </div>

      <div className={styles.courses__container}>
        {isLoading ? (
          Array.from({ length: 6 }).map((item, index) => (
            <div key={index}>
              <CourseItemSkeleton withProgress={false} />
            </div>
          ))
        ) : errorMessage ? (
          <p className={styles.courses__error_message}>{errorMessage}</p>
        ) : (
          courses.map((courseItem) => (
            <CourseItem
              key={courseItem._id}
              courseItem={courseItem}
              withProgress={false}
              isAbleToAdd={true}
            />
          ))
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
