import { PREFERENCES_API_ROOT } from '../util/api-config';
import { handleErrors } from '../util/fetch-utils';

export const SET_PREFS_REQUEST = 'SET_PREFS_REQUEST';
export const SET_PREFS_SUCCESS = 'SET_PREFS_SUCCESS';
export const SET_PREFS_FAILURE = 'SET_PREFS_FAILURE';
export const GET_PREFS_REQUEST = 'GET_PREFS_REQUEST';
export const GET_PREFS_SUCCESS = 'GET_PREFS_SUCCESS';
export const GET_PREFS_FAILURE = 'GET_PREFS_FAILURE';


function setPrefsRequest() {
  return {
    type: SET_PREFS_REQUEST,
  };
}
function setPrefsFailure(err) {
  return {
    type: SET_PREFS_FAILURE,
    err,
  };
}
function setPrefsSuccess(prefs) {
  return {
    type: SET_PREFS_SUCCESS,
    prefs,
  };
}

function getPrefsRequest() {
  return {
    type: GET_PREFS_REQUEST,
  };
}
function getPrefsFailure(err) {
  return {
    type: GET_PREFS_FAILURE,
    err,
  };
}
function getPrefsSuccess(prefs) {
  return {
    type: GET_PREFS_SUCCESS,
    prefs,
  };
}


export function setPrefs(prefs) {
  return dispatch => {
    dispatch(setPrefsRequest());

    return fetch(PREFERENCES_API_ROOT+'/set', {
      method: 'post',
      body: JSON.stringify(prefs),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(() => dispatch(setPrefsSuccess(prefs)))
      .catch(err => dispatch(setPrefsFailure(err)));
  };
}

export function getPrefs() {
  return dispatch => {
    dispatch(getPrefsRequest());

    return fetch(PREFERENCES_API_ROOT+'/get', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(prefs => dispatch(getPrefsSuccess(prefs)))
      .catch(err => dispatch(getPrefsFailure(err)));
  };
}
