import {
  FormErrorsInterface,
  ExerciseInterface,
  WorkoutsListInterface,
  WorkoutProgressInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';
import { current } from '@reduxjs/toolkit';

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
    // console.log(
    //   !loginAndSignupData.email.trim(),
    //   !loginAndSignupData.password.trim(),
    // );
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
): number {
  const currentCourse = courseProgress.find(
    (courseEl) => courseEl.courseId === courseId,
  );

  if (!currentCourse) {
    return 0;
  }

  return currentCourse.workoutsProgress.reduce(
    (sum, workoutProgress) =>
      sum + progressWorkoutNumberDefiner(workoutProgress.progressData),
    0,
  );
}

// export function workoutProgressDefiner(
//   workoutsList: WorkoutsListInterface[],
//   workoutsProgress: WorkoutProgressInterface[],
//   workoutId: string,
// ): number {
//   const currentWorkout = workoutsList.find(
//     (workout) => workout._id === workoutId,
//   );
//   let currentWorkoutExercisesNumber;

//   const currentWorkoutProgress = workoutsProgress.find(
//     (workoutProgress) => workoutProgress.workoutId === workoutId,
//   );
//   let currentWorkoutProgressExercisesNumber;

//   if (
//     !currentWorkout?.exercises.length ||
//     !currentWorkoutProgress?.workoutCompleted
//   ) {
//     return 0;
//   }

//   if (currentWorkout.exercises) {
//     currentWorkoutExercisesNumber = exercisesWorkoutNumberDefiner(
//       currentWorkout.exercises,
//     );
//   }

// }

export function progressbarLevelDefiner(
  courseProgress: CourseProgressInterface[],
  courseId: string,
  workoutsList: WorkoutsListInterface[],
): number {
  const currentLevel =
    (progressTotalNumberDefiner(courseProgress, courseId) /
      exercisesTotalNumberDefiner(workoutsList)) *
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
    return [workoutName.split('.')[0], workoutName.split('.').slice(1).join()];
  }

  if (workoutName.includes(' / ')) {
    return [
      workoutName.split(' / ')[0],
      workoutName.split(' / ').slice(1, -1).join(' / '),
    ];
  }

  return [workoutName];
}

// 6i67sm | Урок 3. Новые движения | no exercises

// ypox9r | Урок 1. Основы | no exercises

// ab1c3f | Утренняя практика / Йога на каждый день / 1 день / Алексей Казубский

// kfpq8e | Разогрев мышц 2.0

// q02a6i | Техника дыхания
