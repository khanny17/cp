import { PLAN_API_ROOT, TEMPLATE_API_ROOT } from '../util/api-config';
import { handleErrors } from '../util/fetch-utils';

export const MINE_REQUEST = 'MINE_REQUEST';
export const MINE_SUCCESS = 'MINE_SUCCESS';
export const MINE_FAILURE = 'MINE_FAILURE';
export const TEMPLATES_REQUEST = 'TEMPLATES_REQUEST';
export const TEMPLATES_SUCCESS = 'TEMPLATES_SUCCESS';
export const TEMPLATES_FAILURE = 'TEMPLATES_FAILURE';

function mineRequest() {
  return { type: MINE_REQUEST };
}
function mineSuccess(plans) {
  return { type: MINE_SUCCESS, plans };
}
function mineFailure(err) {
  return { type: MINE_FAILURE, err };
}

function templatesRequest() {
  return { type: TEMPLATES_REQUEST, };
}
function templatesSuccess(templates) {
  return { type: TEMPLATES_SUCCESS, templates, };
}
function templatesFailure(err) {
  return { type: TEMPLATES_FAILURE, err, };
}


export function getMine() {
  return dispatch => {
    dispatch(mineRequest());
    return fetch(PLAN_API_ROOT+'/mine', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => dispatch(mineSuccess(data)))
      .catch(err => dispatch(mineFailure(err)));
  };
}

export function templates() {
  return dispatch => {
    dispatch(templatesRequest());

    return fetch(TEMPLATE_API_ROOT+'/list', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(templatesSuccess(data));
      })
      .catch(err => dispatch(templatesFailure({ err: err })));
  };
}
