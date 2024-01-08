import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import tasksReducer from './tasks-reducer';
import formReducer from './form-reducer';

const rootReducer = combineReducers({
  tasksReducer: tasksReducer,
  formReducer: formReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;