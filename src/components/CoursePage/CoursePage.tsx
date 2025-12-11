'use client';

import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { addCourse } from '@/services/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateSelectedCourses } from '@/store/features/authSlice';

import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import FittingNumber from './FittingNumber';

import { pictureDefiner } from '@/services/utilities';

import styles from './coursePage.module.css';

export default function CoursePage({
  currentCourseId,
}: {
  currentCourseId: string;
}) {
  // const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { currentCourse } = useAppSelector((state) => state.courses);
  const { user } = useAppSelector((state) => state.authentication);

  const [isOpenAuthPopup, setIsOpenAuthPopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const currentCourseId = courseId;
  // const currentCourseId = courseId ? courseId : params.id;
  const isAlreadySelected = user.selectedCourses.includes(currentCourseId);

  async function addingCourseButtonHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    if (!user.token) {
      toast.warning('Необходима авторизация. Войдите в аккаунт');
      setIsLoading(false);
      return;
    }

    if (isAlreadySelected) {
      toast.info('Чтобы удалить курс, перейдите в профиль');
      setIsLoading(false);
      return;
    }

    try {
      const resultOfAdding = await addCourse(currentCourseId, user.token);

      toast.success(resultOfAdding);
      dispatch(updateSelectedCourses(currentCourseId));
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
  }

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
      <div className={styles.course__pictureContainer}>
        <Image
          src={pictureDefiner(
            currentCourse ? currentCourse.nameEN : 'default',
            'page',
          )}
          alt="course picture"
          width={1160}
          height={310}
        />

        <h2 className={styles.course__title}>{currentCourse?.nameRU}</h2>
      </div>

      <h3 className={styles.auxiliary__title}>Подойдет для вас, если:</h3>

      <ul className={styles.fitting__container}>
        {currentCourse?.fitting.map((fittingEl: string, index) => (
          <li key={index} className={styles.fitting__item}>
            <div>
              <FittingNumber number={index + 1} />
            </div>
            <p className={styles.fitting__itemText}>{fittingEl}</p>
          </li>
        ))}
      </ul>

      <h3 className={styles.auxiliary__title}>Направления</h3>

      <ul className={styles.directions__container}>
        {currentCourse?.directions.map((directionEl: string, index) => (
          <li key={index} className={styles.directions__item}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.46373 1.36751C9.6202 0.704433 9.69843 0.372896 9.82424 0.298229C9.93259 0.233924 10.0674 0.233924 10.1758 0.298229C10.3016 0.372896 10.3798 0.704434 10.5363 1.36751L11.2997 4.60302C11.5837 5.80636 11.7257 6.40803 12.0343 6.89596C12.3071 7.32744 12.6726 7.69285 13.104 7.96574C13.592 8.27432 14.1936 8.4163 15.397 8.70025L18.6325 9.46373C19.2956 9.6202 19.6271 9.69843 19.7018 9.82424C19.7661 9.93259 19.7661 10.0674 19.7018 10.1758C19.6271 10.3016 19.2956 10.3798 18.6325 10.5363L15.397 11.2997C14.1936 11.5837 13.592 11.7257 13.104 12.0343C12.6726 12.3071 12.3071 12.6726 12.0343 13.104C11.7257 13.592 11.5837 14.1936 11.2997 15.397L10.5363 18.6325C10.3798 19.2956 10.3016 19.6271 10.1758 19.7018C10.0674 19.7661 9.93259 19.7661 9.82424 19.7018C9.69843 19.6271 9.6202 19.2956 9.46373 18.6325L8.70025 15.397C8.4163 14.1936 8.27432 13.592 7.96574 13.104C7.69285 12.6726 7.32744 12.3071 6.89596 12.0343C6.40803 11.7257 5.80636 11.5837 4.60301 11.2997L1.36751 10.5363C0.704433 10.3798 0.372896 10.3016 0.298229 10.1758C0.233924 10.0674 0.233924 9.93259 0.298229 9.82424C0.372896 9.69843 0.704434 9.6202 1.36751 9.46373L4.60302 8.70025C5.80636 8.4163 6.40803 8.27432 6.89596 7.96574C7.32744 7.69285 7.69285 7.32744 7.96574 6.89596C8.27432 6.40803 8.4163 5.80636 8.70025 4.60301L9.46373 1.36751Z"
                fill="black"
              />
            </svg>
            {directionEl}
          </li>
        ))}
      </ul>

      <div className={styles.addingCourse__container}>
        <div className={styles.addingCourse__textContainer}>
          <div className={styles.addingCourse__textWrapper}>
            <h3 className={styles.addingCourse__title}>
              Начните путь
              <br />к новому телу
            </h3>

            <ul className={styles.addingCourse__textContent}>
              <li>проработка всех групп мышц</li>
              <li>тренировка суставов</li>
              <li>улучшение циркуляции крови</li>
              <li>упражнения заряжают бодростью</li>
              <li>помогают противостоять стрессам</li>
            </ul>

            <button
              className={classNames(styles.addingCourse__btn, {
                [styles.addingCourse__btn_inactive]: isLoading,
              })}
              disabled={isLoading}
              onClick={(event) => {
                addingCourseButtonHandler(event);
              }}
            >
              {user.token
                ? isAlreadySelected
                  ? 'Курс уже добавлен'
                  : 'Добавить курс'
                : 'Войдите, чтобы добавить курс'}
            </button>
          </div>
        </div>

        <div className={styles.addingCourse__picture}>
          <Image
            className={styles.addingCourse__sportsman}
            priority
            src={'/img/sportsman.png'}
            alt="sportsman"
            width={487}
            height={542}
          />

          <Image
            className={styles.addingCourse__vector}
            src={'/img/vector.png'}
            alt="vector"
            width={670}
            height={391}
          />

          <Image
            className={styles.addingCourse__shoulderVector}
            src={'/img/shoulder-vector.png'}
            alt="vector"
            width={50}
            height={43}
          />
        </div>
      </div>
    </div>
  );
}
