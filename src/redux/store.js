import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import topicsReducer from './slices/topicsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicsReducer,
  },
});

export default store;
