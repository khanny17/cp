import { combineReducers } from 'redux';
import plan from './plan';
import auth from './auth';
import ui from './ui';
import browse from './browse';
import template from './template';
import school from './school';
import preferences from './preferences';

const reducers = combineReducers({
  plan,
  auth,
  ui,
  browse,
  template,
  school,
  preferences,
});

export default reducers;
