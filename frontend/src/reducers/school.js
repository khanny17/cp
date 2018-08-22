import { arrToObj } from '../util/js-helpers';

import {
  GET_SCHOOLS_REQUEST,
  GET_SCHOOLS_SUCCESS,
  GET_SCHOOLS_FAILURE,
} from '../actions/school';

const initialState = {
  schools: null,
  loading: false,
  error: null,
};


function school(state = initialState, action) {
  switch(action.type) {
  case GET_SCHOOLS_REQUEST:
    return {
      ...state,
      loading: true,
      error: false,
    };
  case GET_SCHOOLS_SUCCESS:
    return {
      ...state,
      schools: arrToObj(action.schools, '_id'),
      loading: false,
    };
  case GET_SCHOOLS_FAILURE:
    return {
      ...state,
      schools: {},
      loading: false,
      error: true, //TODO maybe an error message? idk...
    };
  default:
    return state;
  }
}

export default school;
