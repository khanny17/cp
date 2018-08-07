import { AUTH_API_ROOT } from '../util/api-config';
import { handleErrors } from '../util/fetch-utils';
import { push } from 'connected-react-router';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function logout() {
  return {
    type: LOGOUT,
  };
}

function registerRequest() {
  return {
    type: REGISTER_REQUEST,
  };
}

function registerFailure() {
  return {
    type: REGISTER_FAILURE,
  };
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

function loginSuccess(jwt, user) {
  return {
    type: LOGIN_SUCCESS,
    jwt,
    user,
  };
}

export function register(userData) {
  return dispatch => {
    dispatch(registerRequest());

    return fetch(AUTH_API_ROOT+'/register', {
      method: 'post',
      body: JSON.stringify(userData),
    })
      .then(jwt => dispatch(registerSuccess(jwt)))
      .then(() => dispatch(push('/browse')))
      .catch(err => dispatch(registerFailure(err)));
  };
}

export function login(userData) {
  return dispatch => {
    dispatch(loginRequest());

    return fetch(AUTH_API_ROOT+'/login', {
      method: 'post',
      body: JSON.stringify(userData),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(loginSuccess(data.jwt, data.user));
      })
      .then(() => dispatch(push('/browse')))
      .catch(err => dispatch(loginFailure(err)));
  };
}
