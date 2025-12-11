import '@testing-library/jest-dom';

import ReduxProvider from '@/store/ReduxProvider';
import { fireEvent, render, screen } from '@testing-library/react';

import coursesData from '../../data/coursesData';
import workoutsData from '../../data/workoutsData';
import userData from '../../data/userData';

import CourseItem from './CourseItem';

describe('CourseItem component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('отображение данных курса на странице', () => {
    const courseWorkouts = workoutsData.find(
      (courseWorkoutsList) =>
        courseWorkoutsList.courseId === coursesData[0]._id,
    );

    if (!userData.selectedCourses.includes(coursesData[0]._id)) {
      console.log(
        `У пользователя не был добавлен курс с id ${coursesData[0]._id}`,
      );
      return;
    }

    render(
      <ReduxProvider>
        <CourseItem
          courseItem={coursesData[0]}
          withProgress={true}
          isAbleToAdd={false}
          courseWorkouts={courseWorkouts}
        />
      </ReduxProvider>,
    );

    // отрисовка названия курса на русском
    expect(screen.getAllByText(coursesData[0].nameRU).length).toBeGreaterThan(
      0,
    );

    // отрисовка длительности курса (в днях)
    expect(
      screen.getAllByText(`${coursesData[0].durationInDays} дней`).length,
    ).toBeGreaterThan(0);

    // отрисовка длительности курса (в минутах)
    expect(
      screen.getAllByText(
        `${
          coursesData[0].dailyDurationInMinutes.from
        }-${coursesData[0].dailyDurationInMinutes.to} мин/день`,
      ).length,
    ).toBeGreaterThan(0);

    // отрисовка сложности курса
    expect(
      screen.getAllByText(`Сложность: ${coursesData[0].difficulty}`).length,
    ).toBeGreaterThan(0);

    // кнопка существует и кликается без ошибок
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
