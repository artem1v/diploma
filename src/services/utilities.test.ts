import coursesData from '@/data/coursesData';
import workoutsData from '@/data/workoutsData';
import courseProgressData from '@/data/courseProgressData';

import { WorkoutsListInterface } from '@/sharedInterfaces/sharedInterfaces';

import {
  pictureDefiner,
  exercisesTotalNumberDefiner,
  progressTotalNumberDefiner,
  progressbarCourseDefiner,
  workoutsNamesHelper,
} from './utilities';

function findWorkoutsListByCourseId(courseId: string): WorkoutsListInterface[] {
  return (
    workoutsData.find((workoutsEl) => workoutsEl.courseId === courseId)
      ?.workoutsList || []
  );
}

describe('pictureDefiner', () => {
  // получение корректного адреса изображения
  it('Stretching', () => {
    expect(pictureDefiner('Stretching', 'item')).toStrictEqual(
      '/img/blue-item.png',
    );
  });
  it('StepAirobic', () => {
    expect(pictureDefiner('StepAirobic', 'page')).toStrictEqual(
      '/img/peach-page.png',
    );
  });
  it('Yoga', () => {
    expect(pictureDefiner('Yoga', 'item')).toStrictEqual(
      '/img/yellow-item.png',
    );
  });
  it('BodyFlex', () => {
    expect(pictureDefiner('BodyFlex', 'page')).toStrictEqual(
      '/img/violet-page.png',
    );
  });
  it('Fitness', () => {
    expect(pictureDefiner('Fitness', 'item')).toStrictEqual(
      '/img/orange-item.png',
    );
  });
  it('Powerlifting', () => {
    expect(pictureDefiner('Powerlifting', 'page')).toStrictEqual(
      '/img/no-photo-page.png',
    );
  });
});

describe('workouts for each array of courses is equal', () => {
  // сравнение данных о тренировках разных запросов

  const courses = coursesData.map((courseEl) => {
    return {
      courseId: courseEl._id,
      workouts: courseEl.workouts,
    };
  });

  const workouts = workoutsData.map((workoutsEl) => {
    return {
      courseId: workoutsEl.courseId,
      workoutsList: workoutsEl.workoutsList.map((workoutEl) => workoutEl._id),
    };
  });

  it('идентичные id тренировок для каждого курса разных массивов', () => {
    courses.forEach((workoutsEl) => {
      const secondItem = workouts.find(
        (workoutsListEl) => workoutsListEl.courseId === workoutsEl.courseId,
      );

      expect(secondItem).toBeDefined();

      expect(workoutsEl.workouts.sort()).toEqual(
        secondItem!.workoutsList.sort(),
      );
    });
  });
});

describe('exercisesTotalNumberDefiner', () => {
  // корректное определение количества упражнений
  it('6i67sm', () => {
    expect(
      exercisesTotalNumberDefiner(findWorkoutsListByCourseId('6i67sm')),
    ).toEqual(1);
  });

  it('ab1c3f', () => {
    expect(
      exercisesTotalNumberDefiner(findWorkoutsListByCourseId('ab1c3f')),
    ).toEqual(160);
  });

  it('kfpq8e', () => {
    expect(
      exercisesTotalNumberDefiner(findWorkoutsListByCourseId('kfpq8e')),
    ).toEqual(130);
  });

  it('q02a6i', () => {
    expect(
      exercisesTotalNumberDefiner(findWorkoutsListByCourseId('q02a6i')),
    ).toEqual(135);
  });

  it('ypox9r', () => {
    expect(
      exercisesTotalNumberDefiner(findWorkoutsListByCourseId('ypox9r')),
    ).toEqual(1);
  });
});

describe('progressTotalNumberDefiner', () => {
  // корректное определение прогресса курса

  // no exercises course completed
  it('6i67sm', () => {
    expect(
      progressTotalNumberDefiner(
        courseProgressData,
        '6i67sm',
        findWorkoutsListByCourseId('6i67sm'),
      ),
    ).toEqual(4);
  });

  // no exercises course not completed
  it('ypox9r', () => {
    expect(
      progressTotalNumberDefiner(
        courseProgressData,
        'ypox9r',
        findWorkoutsListByCourseId('ypox9r'),
      ),
    ).toEqual(1);
  });

  // with exercises course completed
  it('kfpq8e', () => {
    expect(
      progressTotalNumberDefiner(
        courseProgressData,
        'kfpq8e',
        findWorkoutsListByCourseId('kfpq8e'),
      ),
    ).toEqual(130);
  });

  // with exercises course not completed
  it('ab1c3f', () => {
    expect(
      progressTotalNumberDefiner(
        courseProgressData,
        'ab1c3f',
        findWorkoutsListByCourseId('ab1c3f'),
      ),
    ).toEqual(60);
  });
});

describe('progressbarCourseDefiner', () => {
  // корректное определение полосы прогресса курса

  // no exercises course completed
  it('6i67sm', () => {
    expect(
      progressbarCourseDefiner(
        courseProgressData,
        '6i67sm',
        findWorkoutsListByCourseId('6i67sm'),
      ),
    ).toEqual(100);
  });

  // no exercises course not completed
  it('ypox9r', () => {
    expect(
      progressbarCourseDefiner(
        courseProgressData,
        'ypox9r',
        findWorkoutsListByCourseId('ypox9r'),
      ),
    ).toEqual(20);
  });

  // with exercises course completed
  it('kfpq8e', () => {
    expect(
      progressbarCourseDefiner(
        courseProgressData,
        'kfpq8e',
        findWorkoutsListByCourseId('kfpq8e'),
      ),
    ).toEqual(100);
  });

  // with exercises course not completed
  it('ab1c3f', () => {
    expect(
      progressbarCourseDefiner(
        courseProgressData,
        'ab1c3f',
        findWorkoutsListByCourseId('ab1c3f'),
      ),
    ).toEqual(37);
  });
});

describe('workoutsNamesHelper', () => {
  // Формат отображения названий тренировок
  it('includes Урок', () => {
    expect(workoutsNamesHelper('Урок 3. Новые движения')).toStrictEqual([
      'Урок 3',
      'Новые движения',
    ]);
  });

  it('includes /', () => {
    expect(
      workoutsNamesHelper(
        'Утренняя практика / Йога на каждый день / 1 день / Алексей Казубский',
      ),
    ).toStrictEqual(['Утренняя практика', 'Йога на каждый день / 1 день']);
  });

  it('default name', () => {
    expect(workoutsNamesHelper('Техника дыхания')).toStrictEqual([
      'Техника дыхания',
    ]);
  });
});
