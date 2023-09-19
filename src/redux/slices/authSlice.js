import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const initialState = {
  user: null,
  isAuth: false,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = !!action.payload;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectIsAuth = (state) => state.auth.isAuth;

export const { setUser, userLogout } = slice.actions;
export default persistReducer(persistConfig, slice.reducer);
