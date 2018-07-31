import { combineReducers } from 'redux';
import plan from './plan';
import auth from './auth';

const reducers = combineReducers({
  plan,
  auth,
});

export default reducers;
