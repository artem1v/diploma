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

  if (exercisesTotalNumberDefiner(workoutsList) === 1) {
    return currentCourse.workoutsProgress.map(
      (workoutProgress) => workoutProgress.workoutCompleted,
    ).length;
  }

  return currentCourse.workoutsProgress.reduce(
    (sum, workoutProgress) =>
      sum + progressWorkoutNumberDefiner(workoutProgress.progressData),
    0,
  );
}

export function progressbarCourseDefiner(
  courseProgress: CourseProgressInterface[],
  courseId: string,
  workoutsList: WorkoutsListInterface[],
): number {
  const currentLevel =
    (progressTotalNumberDefiner(courseProgress, courseId, workoutsList) /
      (exercisesTotalNumberDefiner(workoutsList) === 1
        ? workoutsList.length
        : exercisesTotalNumberDefiner(workoutsList))) *
    100;

  if (currentLevel === 0) {
    return 0;
  }

  if (currentLevel < 1) {
    return Math.ceil(currentLevel);
  }

  if (currentLevel > 1) {
    return Math.floor(currentLevel);
  }

  if (currentLevel >= 100) {
    return 100;
  }

  return currentLevel;
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
