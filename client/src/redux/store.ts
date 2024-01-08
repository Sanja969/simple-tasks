import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import tasksReducer from './tasks-reducer';

const rootReducer = combineReducers({
  tasksReducer: tasksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;