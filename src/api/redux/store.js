import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import topicReducer from './reducers/topic';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        topic: topicReducer,
    },
});

export default store;