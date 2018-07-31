import { combineReducers } from 'redux';
import plan from './plan';
import auth from './auth';
import ui from './ui';

const reducers = combineReducers({
  plan,
  auth,
  ui,
});

export default reducers;
