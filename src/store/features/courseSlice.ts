import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  initialStoreState,
  CourseItemInterface,
} from '@/sharedInterfaces/sharedInterfaces';

const initialState: initialStoreState = {
  currentCourse: null,
};

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<CourseItemInterface>) => {
      state.currentCourse = action.payload;
    },
  },
});

export const { setCurrentCourse } = courseSlice.actions;

export const courseSliceReducer = courseSlice.reducer;
