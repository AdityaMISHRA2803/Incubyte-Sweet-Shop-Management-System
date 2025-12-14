import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sweetReducer from '../features/sweets/sweetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sweets: sweetReducer,
  },
});

