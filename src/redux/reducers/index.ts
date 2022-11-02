import {combineReducers} from 'redux';
import bookmarkReducer from './bookmark';

const allReducers = {
  bookmark: bookmarkReducer,
};

export default combineReducers(allReducers);
