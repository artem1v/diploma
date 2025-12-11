'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearStorageTokens, setisOpenPopup } from '@/store/features/authSlice';

import styles from './header.module.css';

export default function Header({
  withInscription,
}: {
  withInscription: boolean;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isOpenPopup, email } = useAppSelector(
    (state) => state.authentication,
  );

  const [isOpenManagementPanel, setIsOpenManagementPanel] =
    useState<boolean>(false);

  function toggleManagementPanel(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    state: boolean,
  ) {
    event.stopPropagation();

    setIsOpenManagementPanel(state);
  }

  function userLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    setIsOpenManagementPanel(false);

    dispatch(clearStorageTokens());
    router.push('/main');
  }

  return (
    <header>
      <div className={styles.logoLogin__wrapper}>
        <Image
          src={withInscription ? '/img/logo-inscription.png' : '/img/logo.png'}
          alt="skypro fitness logo"
          width={withInscription ? 326 : 220}
          height={withInscription ? 71 : 35}
          onClick={() => {
            router.push('/main');
          }}
          style={{ cursor: 'pointer' }}
        />

        {email ? (
          <div
            className={styles.login__infoContainer}
            onClick={() => {
              setIsOpenManagementPanel(!isOpenManagementPanel);
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.8334 21.0001C41.8334 32.506 32.506 41.8334 21.0001 41.8334C9.49415 41.8334 0.166748 32.506 0.166748 21.0001C0.166748 9.49415 9.49415 0.166748 21.0001 0.166748C32.506 0.166748 41.8334 9.49415 41.8334 21.0001ZM33.5001 28.4406C33.5001 31.8923 27.9036 35.5834 21.0001 35.5834C14.0965 35.5834 8.50008 31.8923 8.50008 28.4406C8.50008 24.9888 14.0965 23.0834 21.0001 23.0834C27.9036 23.0834 33.5001 24.9888 33.5001 28.4406ZM21.0001 18.9167C24.4519 18.9167 27.2501 16.1185 27.2501 12.6667C27.2501 9.21497 24.4519 6.41675 21.0001 6.41675C17.5483 6.41675 14.7501 9.21497 14.7501 12.6667C14.7501 16.1185 17.5483 18.9167 21.0001 18.9167Z"
                fill="#D9D9D9"
              />
            </svg>

            <h4 className={styles.login__userEmail}>{email}</h4>

            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3553 1.03308L6.67773 6.7107L1.00012 1.03308"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
            {isOpenManagementPanel ? (
              <div className={styles.login__managementPanel}>
                <p className={styles.login__userEmail_panel}>{email}</p>

                <Link
                  className={styles.login__panel_profileBtn}
                  onClick={(event) => {
                    toggleManagementPanel(event, false);
                  }}
                  href={'/profile'}
                >
                  Мой профиль
                </Link>

                <button
                  className={styles.login__panel_logoutBtn}
                  onClick={(event) => {
                    userLogout(event);
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              dispatch(setisOpenPopup(!isOpenPopup));
            }}
            className={styles.loginBtn}
          >
            Войти
          </button>
        )}
      </div>
    </header>
  );
}
