'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import Header from '../Header/Header';
import CourseItem from '../CourseItem/CourseItem';

import { CourseItemInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './profile.module.css';

export default function Profile() {
  const [courses, setCourses] = useState<CourseItemInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   async function getCourses() {
  //     try {
  //       const allCourses = await getAllCourses();
  //       setCourses(allCourses);
  //     } catch (error) {
  //       if (error instanceof AxiosError) {
  //         if (error.response) {
  //           setErrorMessage(error.response.data.message);
  //         } else {
  //           setErrorMessage('Курсы временно недоступны, попробуйте позже');
  //         }
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getCourses();
  // }, []);

  return (
    <>
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
          <h3 className={styles.profile__username}>Сергей</h3>

          <span className={styles.profile__login}>Логин: sergey.petrov96</span>

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
          courses.map((courseItem) => (
            <CourseItem
              key={courseItem._id}
              courseItem={courseItem}
              withAuthentication={true}
            />
          ))
        )}
      </div>
    </>
  );
}
