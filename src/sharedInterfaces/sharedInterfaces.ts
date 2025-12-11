import { SetStateAction } from 'react';

export interface LoginAndSignupDataInterface {
  email: string;
  password: string;
}

export interface LoginPromiseInterface {
  token: string;
}

export interface SignupPromiseInterface {
  message: string;
}

export interface CourseItemInterface {
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  _id: string;
  description: string;
  directions: string[];
  fitting: string[];
  nameEN: string;
  nameRU: string;
  order: number;
  difficulty: string;
  durationInDays: number;
  workouts: string[];
  __v: number;
}

export interface UserDataInterface {
  _id: string;
  email: string;
  password: string;
  selectedCourses: string[];
  courseProgress: CourseProgressInterface[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ExerciseInterface {
  name: string;
  quantity: number;
  _id: string;
}

export interface WorkoutsListInterface {
  _id: string;
  name: string;
  video: string;
  exercises: ExerciseInterface[];
  __v: number;
}

export interface WorkoutsStateInterface {
  courseId: string;
  workoutsList: WorkoutsListInterface[];
}

export interface WorkoutProgressInterface {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
  _id: string;
}

export interface CourseProgressInterface {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgressInterface[];
  _id: string;
}

export interface FormErrorsInterface {
  loginAndSignupData: {
    email: string;
    password: string;
  };
  passwordCheck: string;
  setErrors: React.Dispatch<
    SetStateAction<{
      email: boolean;
      password: boolean;
      passwordCheck: boolean;
    }>
  >;
  setErrorMessage: React.Dispatch<SetStateAction<string>>;
  isSignup: boolean;
}
