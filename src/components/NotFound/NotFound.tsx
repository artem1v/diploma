import Link from 'next/link';

import styles from './notFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFound__wrapper}>
      <div className={styles.notFound__container}>
        <div className={styles.notFound__block}>
          <div className={styles.notFound__title_container}>
            <h1 className={styles.notFound__title}>404</h1>
            <hr className={styles.notFound__title_demarcationLine} />
            <h2 className={styles.notFound__subTitle}>
              Страница <br />
              не найдена
            </h2>
          </div>

          <p className={styles.notFound__description}>
            Возможно, она была удалена <br />
            или перенесена на другой адрес
          </p>

          <Link className={styles.btn__portalToMain} href="/main">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
