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

        <div className={styles.addRemove__icon_skeleton}></div>
      </div>

      <div className={styles.course__infoContainer}>
        <Skeleton
          className={styles.course__title_skeleton}
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
