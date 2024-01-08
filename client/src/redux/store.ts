import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import tasksReducer from './tasks-reducer';
import formReducer from './form-reducer';
import userReducer from './user-reducer';

const rootReducer = combineReducers({
  tasksReducer: tasksReducer,
  formReducer: formReducer,
  userReducer: userReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;