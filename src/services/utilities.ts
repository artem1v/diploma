import {
  FormErrorsInterface,
  ExerciseInterface,
  WorkoutsListInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

export function pictureDefiner(name: string, size: string) {
  switch (name) {
    case 'Stretching':
      return `/img/blue-${size}.png`;
    case 'StepAirobic':
      return `/img/peach-${size}.png`;
    case 'Yoga':
      return `/img/yellow-${size}.png`;
    case 'BodyFlex':
      return `/img/violet-${size}.png`;
    case 'Fitness':
      return `/img/orange-${size}.png`;
    default:
      return `/img/no-photo-${size}.png`;
  }
}

export function formErrors({
  loginAndSignupData,
  passwordCheck,
  setErrors,
  setErrorMessage,
  isSignup,
}: FormErrorsInterface): boolean {
  let isCorrect: boolean = true;
  setErrorMessage('');
  const clearedErrors = {
    email: false,
    password: false,
    passwordCheck: false,
  };

  if (
    !loginAndSignupData.email.trim() ||
    !loginAndSignupData.password.trim() ||
    isSignup
      ? !passwordCheck.trim()
      : false
  ) {
    setErrorMessage('Пожалуйста, заполните все поля');
    isCorrect = false;

    if (!loginAndSignupData.email.trim()) {
      clearedErrors.email = true;
    }

    if (!loginAndSignupData.password.trim()) {
      clearedErrors.password = true;
    }

    if (isSignup ? !passwordCheck.trim() : false) {
      clearedErrors.passwordCheck = true;
    }

    setErrors(clearedErrors);
    return isCorrect;
  }

  if (isSignup) {
    if (loginAndSignupData.password !== passwordCheck) {
      setErrorMessage('Пароли не совпадают');
      isCorrect = false;

      clearedErrors.password = true;
      clearedErrors.passwordCheck = true;
    }

    setErrors(clearedErrors);
    return isCorrect;
  } else {
    return isCorrect;
  }
}

export function exercisesWorkoutNumberDefiner(
  exercises: ExerciseInterface[],
): number {
  return exercises.reduce((sum, exercise) => sum + exercise.quantity, 0);
}

export function exercisesTotalNumberDefiner(
  workoutsList: WorkoutsListInterface[],
): number {
  const totalQuantity = workoutsList.reduce(
    (sum, workout) => sum + exercisesWorkoutNumberDefiner(workout.exercises),
    0,
  );

  if (!totalQuantity) {
    return 1;
  }

  return totalQuantity;
}

export function progressWorkoutNumberDefiner(progressData: number[]): number {
  return progressData.reduce(
    (sum, exerciseProgress) => sum + exerciseProgress,
    0,
  );
}

export function progressTotalNumberDefiner(
  courseProgress: CourseProgressInterface[],
  courseId: string,
  workoutsList: WorkoutsListInterface[],
): number {
  const currentCourse = courseProgress.find(
    (courseEl) => courseEl.courseId === courseId,
  );

  if (!currentCourse) {
    return 0;
  }

  // Считаем количество полностью завершенных тренировок
  const completedWorkoutsCount = currentCourse.workoutsProgress.filter(
    (workoutProgress) => workoutProgress.workoutCompleted,
  ).length;

  // Если каждая тренировка считается как единица (например, для уроков)
  if (exercisesTotalNumberDefiner(workoutsList) === 1) {
    return completedWorkoutsCount;
  }

  // Для других случаев возвращаем количество завершенных тренировок
  // (каждая завершенная тренировка = 1 единица прогресса)
  return completedWorkoutsCount;
}

export function progressbarCourseDefiner(
  courseProgress: CourseProgressInterface[],
  courseId: string,
  workoutsList: WorkoutsListInterface[],
): number {
  const completedWorkouts = progressTotalNumberDefiner(
    courseProgress,
    courseId,
    workoutsList,
  );

  const totalWorkouts = workoutsList.length;

  // Если нет тренировок в курсе
  if (totalWorkouts === 0) {
    return 0;
  }

  // Рассчитываем процент завершенных тренировок
  const currentLevel = (completedWorkouts / totalWorkouts) * 100;

  // Округляем вниз, чтобы прогресс увеличивался только после завершения всей тренировки
  const roundedLevel = Math.floor(currentLevel);

  // Возвращаем не более 100%
  return Math.min(roundedLevel, 100);
}

export function workoutsNamesHelper(workoutName: string): string[] {
  if (workoutName.includes('Урок')) {
    return [workoutName.split('.')[0], workoutName.split('. ').slice(1).join()];
  }

  if (workoutName.includes(' / ')) {
    return [
      workoutName.split(' / ')[0],
      workoutName.split(' / ').slice(1, -1).join(' / '),
    ];
  }

  return [workoutName];
}
