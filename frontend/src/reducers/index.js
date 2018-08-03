import { combineReducers } from 'redux';
import plan from './plan';
import auth from './auth';
import ui from './ui';
import browse from './browse';

const reducers = combineReducers({
  plan,
  auth,
  ui,
  browse,
});

export default reducers;
