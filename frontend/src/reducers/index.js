import { combineReducers } from 'redux';
import plan from './plan';
import auth from './auth';
import ui from './ui';
import browse from './browse';
import template from './template';

const reducers = combineReducers({
  plan,
  auth,
  ui,
  browse,
  template,
});

export default reducers;
