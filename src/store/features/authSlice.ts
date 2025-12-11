import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  isOpenPopup: boolean;
  // регулирует отображение окна авторизации / регистрации

  isSignup: boolean;
  // текущая форма: авторизация / регистрация

  email: string;
  // email используется как логин

  token: string;
  // токен
}

const initialState: initialState = {
  isOpenPopup: false,
  isSignup: false,
  email: '',
  token: '',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setisOpenPopup: (state, action: PayloadAction<boolean>) => {
      state.isOpenPopup = action.payload;
    },

    setisSignUp: (state, action: PayloadAction<boolean>) => {
      state.isSignup = action.payload;
    },

    setStorageLogin: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      // localStorage.setItem('email', action.payload);
    },

    setStorageToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      // localStorage.setItem('token', action.payload);
    },

    clearStorageTokens: (state) => {
      state.email = '';
      state.token = '';

      // localStorage.removeItem('email');
      // localStorage.removeItem('token');
    },
  },
});

export const {
  setisOpenPopup,
  setisSignUp,
  setStorageLogin,
  setStorageToken,
  clearStorageTokens,
} = authSlice.actions;

export const authSliceSliceReducer = authSlice.reducer;
