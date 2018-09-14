import { SCHOOL_API_ROOT } from '../util/api-config';
import { handleErrors } from '../util/fetch-utils';

export const GET_SCHOOLS_REQUEST = 'GET_SCHOOLS_REQUEST';
export const GET_SCHOOLS_SUCCESS = 'GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAILURE = 'GET_SCHOOLS_FAILURE';

function getSchoolsRequest() {
  return {
    type: GET_SCHOOLS_REQUEST,
  };
}
function getSchoolsSuccess(schools) {
  return {
    type: GET_SCHOOLS_SUCCESS,
    schools,
  };
}
function getSchoolsFailure(err) {
  return {
    type: GET_SCHOOLS_FAILURE,
    err,
  };
}

export function getSchools() {
  return dispatch => {
    dispatch(getSchoolsRequest());

    return fetch(SCHOOL_API_ROOT+'/schools', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(getSchoolsSuccess(data));
      })
      .catch(err => dispatch(getSchoolsFailure({ err: err })));
  };
}

