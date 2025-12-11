import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CourseItemInterface,
  WorkoutsStateInterface,
  WorkoutsListInterface,
} from '@/sharedInterfaces/sharedInterfaces';

interface initialStoreState {
  allCourses: CourseItemInterface[];
  // все курсы

  allWorkouts: WorkoutsStateInterface[];
  // все тренировки

  currentCourse: null | CourseItemInterface;
  // текущий курс

  currentWorkout: null | WorkoutsListInterface;
  // текущая тренировка
}

const initialState: initialStoreState = {
  allCourses: [],
  allWorkouts: [],
  currentCourse: null,
  currentWorkout: null,
};

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setAllCourses: (state, action: PayloadAction<CourseItemInterface[]>) => {
      state.allCourses = action.payload;
    },

    setAllWorkouts: (
      state,
      action: PayloadAction<WorkoutsStateInterface[]>,
    ) => {
      state.allWorkouts = action.payload;
    },

    setCurrentCourse: (
      state,
      action: PayloadAction<null | CourseItemInterface>,
    ) => {
      state.currentCourse = action.payload;
    },

    setCurrentWorkout: (
      state,
      action: PayloadAction<null | WorkoutsListInterface>,
    ) => {
      state.currentWorkout = action.payload;
    },
  },
});

export const {
  setAllCourses,
  setAllWorkouts,
  setCurrentCourse,
  setCurrentWorkout,
} = courseSlice.actions;

export const courseSliceReducer = courseSlice.reducer;
