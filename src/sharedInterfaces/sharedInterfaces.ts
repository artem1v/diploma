import { SetStateAction } from 'react';

export interface initialStoreState {
  currentCourse: null | CourseItemInterface;
  // текущий курс
}

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
