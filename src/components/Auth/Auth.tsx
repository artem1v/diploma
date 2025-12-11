'use client';

import Image from 'next/image';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { userLogin, userSignup } from '@/services/authApi';
import { getUserData } from '@/services/courseApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setisOpenPopup,
  setisSignUp,
  setUserId,
  setStorageLogin,
  setStorageToken,
  setSelectedCourses,
  setCourseProgress,
} from '@/store/features/authSlice';

import {
  LoginAndSignupDataInterface,
  LoginPromiseInterface,
  SignupPromiseInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import { formErrors } from '@/services/utilities';

import styles from './auth.module.css';

// asdzxcqwe@example.com
// Asdzxcqwe@@!

export default function Auth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isOpenPopup, isSignup } = useAppSelector(
    (state) => state.authentication,
  );

  const [loginAndSignupData, setLoginAndSignupData] =
    useState<LoginAndSignupDataInterface>({
      email: '',
      password: '',
    });
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<{
    email: boolean;
    password: boolean;
    passwordCheck: boolean;
  }>({
    email: false,
    password: false,
    passwordCheck: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  function onFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.currentTarget.name) {
      case 'email':
        setLoginAndSignupData({
          ...loginAndSignupData,
          email: event.currentTarget.value,
        });
        break;

      case 'password':
        setLoginAndSignupData({
          ...loginAndSignupData,
          password: event.currentTarget.value,
        });
        break;
    }
  }

  function onPasswordCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(event.currentTarget.value);
  }

  function onFormTypeChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setErrorMessage('');
    setErrors({
      email: false,
      password: false,
      passwordCheck: false,
    });
    dispatch(setisSignUp(!isSignup));
  }

  function userFormRequest(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true);

    console.log(loginAndSignupData);

    if (
      !formErrors({
        loginAndSignupData,
        passwordCheck,
        setErrors,
        setErrorMessage,
        isSignup,
      })
    ) {
      setLoading(false);
      return;
    }

    const usedFunction = isSignup ? userSignup : userLogin;

    usedFunction(loginAndSignupData)
      .then((response) => {
        if (!isSignup) {
          const loginResponse = response as LoginPromiseInterface;
          dispatch(setStorageLogin(loginAndSignupData.email));
          dispatch(setStorageToken(loginResponse.token));

          toast.success('Вход выполнен');

          getUserData(loginResponse.token).then((response) => {
            console.log(response);
            dispatch(setSelectedCourses(response.selectedCourses));
            dispatch(setCourseProgress(response.courseProgress));
          });
        } else {
          // const signupResponse = response as SignupPromiseInterface;
          // toast.success(signupResponse.message);
        }

        dispatch(setisOpenPopup(!isOpenPopup));
        return response;
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);

            const hasEmail: boolean = error.response.data.message
              .toLowerCase()
              .includes('email');

            switch (hasEmail) {
              case true:
                setErrors({
                  ...errors,
                  email: true,
                });
                break;

              case false:
                setErrors({
                  ...errors,
                  password: true,
                });
                break;
            }
          } else if (error.request) {
            setErrorMessage('Проверьте интернет-соединение и попробуйте позже');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.auth__container}>
      <Image
        src={'/img/logo.png'}
        alt="skypro fitness logo"
        width={220}
        height={35}
      />

      <div className={styles.auth__formContainer}>
        <div className={styles.auth__inputsContainer}>
          <input
            className={classNames(styles.auth__input, {
              [styles.auth__input_error]: errors.email,
            })}
            type="text"
            name="email"
            placeholder="Эл. почта"
            value={loginAndSignupData.email}
            onChange={(event) => onFormInputChange(event)}
          />
          <input
            className={classNames(styles.auth__input, {
              [styles.auth__input_error]: errors.password,
            })}
            type="password"
            name="password"
            placeholder="Пароль"
            value={loginAndSignupData.password}
            onChange={(event) => onFormInputChange(event)}
          />

          {isSignup ? (
            <input
              className={classNames(styles.auth__input, {
                [styles.auth__input_error]: errors.passwordCheck,
              })}
              type="password"
              name="password"
              placeholder="Повторите пароль"
              value={passwordCheck}
              onChange={(event) => onPasswordCheckChange(event)}
            />
          ) : (
            ''
          )}
        </div>

        <div className={styles.errorContainer}>{errorMessage}</div>

        <div className={styles.auth__btnsContainer}>
          <button
            disabled={loading}
            className={classNames(
              styles.auth__btnSendData,
              styles.auth__btnText,
              {
                [styles.auth__btnSendData_inactive]: loading,
                [styles.auth__btnText_inactive]: loading,
              },
            )}
            onClick={(event) => {
              userFormRequest(event);
            }}
          >
            {isSignup ? 'Зарегистрироваться' : 'Войти'}
          </button>

          <button
            disabled={loading}
            className={classNames(
              styles.auth__btnFormChange,
              styles.auth__btnText,
              {
                [styles.auth__btnFormChange_inactive]: loading,
                [styles.auth__btnText_inactive]: loading,
              },
            )}
            onClick={(event) => {
              onFormTypeChange(event);
            }}
          >
            {isSignup ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  );
}
