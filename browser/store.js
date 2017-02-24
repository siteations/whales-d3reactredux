import {vesselReducer} from './react/action-creators/actions.js';
import {createStore, applyMiddleware} from 'redux';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export default createStore(
  vesselReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
);
