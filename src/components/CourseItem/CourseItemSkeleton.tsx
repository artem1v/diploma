import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './courseItem.module.css';

export default function CourseItemSkeleton({
  withProgress,
}: {
  withProgress: boolean;
}) {
  const baseColor = '#FAFAFA';
  const highlightColor = 'rgba(0, 0, 0, 0.2)';
  const duration = 2;
  const direction = 'rtl';
  const infoDesignWidthArray = [103, 163, 129];

  return (
    <div className={styles.course}>
      <div className={styles.course__pictureContainer}>
        <Skeleton
          width={360}
          height={325}
          borderRadius={30}
          baseColor={baseColor}
          highlightColor={highlightColor}
          duration={duration}
          direction={direction}
        />

        <svg
          className={styles.addRemove__icon}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.9998 29.3333C23.3636 29.3333 29.3332 23.3638 29.3332 16C29.3332 8.63616 23.3636 2.66663 15.9998 2.66663C8.63604 2.66663 2.6665 8.63616 2.6665 16C2.6665 23.3638 8.63604 29.3333 15.9998 29.3333ZM9.33317 14.6666V17.3333H22.6665V14.6666H9.33317Z"
            fill="white"
          />
        </svg>
      </div>

      <div className={styles.course__infoContainer}>
        <Skeleton
          style={{ marginBottom: '20px' }}
          height={35}
          borderRadius={10}
          baseColor={baseColor}
          highlightColor={highlightColor}
          duration={duration}
          direction={direction}
        />

        <div className={styles.course__infoWrapper}>
          {infoDesignWidthArray.map((item, index) => (
            <Skeleton
              key={index}
              height={38}
              width={item}
              borderRadius={50}
              baseColor={baseColor}
              highlightColor={highlightColor}
              duration={duration}
              direction={direction}
            />
          ))}
        </div>

        {withProgress ? (
          <Skeleton
            style={{ marginTop: '20px', marginBottom: '40px' }}
            height={36}
            borderRadius={10}
            baseColor={baseColor}
            highlightColor={highlightColor}
            duration={duration}
            direction={direction}
          />
        ) : (
          ''
        )}

        {withProgress ? (
          <Skeleton
            height={52}
            borderRadius={46}
            baseColor={baseColor}
            highlightColor={highlightColor}
            duration={duration}
            direction={direction}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
