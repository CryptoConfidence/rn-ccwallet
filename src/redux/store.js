import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import combinedReducer from './combinedReducer';

const loggerMiddleware = createLogger();

export const store = createStore(
  combinedReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);