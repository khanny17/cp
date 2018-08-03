import { PLAN_API_ROOT } from '../util/api-config';
import { handleErrors } from '../util/fetch-utils';
import { push } from 'connected-react-router';

export const SAVE_PLAN_REQUEST = 'SAVE_PLAN_REQUEST';
export const SAVE_PLAN_FAILURE = 'SAVE_PLAN_FAILURE';
export const SAVE_PLAN_SUCCESS = 'SAVE_PLAN_SUCCESS';
export const LOAD_PLAN_REQUEST = 'LOAD_PLAN_REQUEST';
export const LOAD_PLAN_FAILURE = 'LOAD_PLAN_FAILURE';
export const LOAD_PLAN_SUCCESS = 'LOAD_PLAN_SUCCESS';
export const DELETE_PLAN_REQUEST = 'DELETE_PLAN_REQUEST';
export const DELETE_PLAN_FAILURE = 'DELETE_PLAN_FAILURE';
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS';
export const NEW_PLAN = 'NEW_PLAN';


export function newPlan() {
  return {
    type: NEW_PLAN,
  };
}

function savePlanRequest() {
  return {
    type: SAVE_PLAN_REQUEST,
  };
}
function savePlanSuccess(data) {
  return {
    type: SAVE_PLAN_SUCCESS,
    data,
  };
}
function savePlanFailure(error) {
  return {
    type: SAVE_PLAN_FAILURE,
    error,
  };
}

function loadPlanRequest(plan_id) {
  return {
    type: LOAD_PLAN_REQUEST,
    plan_id
  };
}
function loadPlanSuccess(data) {
  return {
    type: LOAD_PLAN_SUCCESS,
    data,
  };
}
function loadPlanFailure(planId, err) {
  return {
    type: LOAD_PLAN_FAILURE,
    planId,
    err,
  };
}

function deletePlanRequest(plan_id) {
  return {
    type: DELETE_PLAN_REQUEST,
    plan_id,
  };
}
function deletePlanSuccess(plan_id) {
  return {
    type: DELETE_PLAN_SUCCESS,
    plan_id,
  };
}
function deletePlanFailure(plan_id) {
  return {
    type: DELETE_PLAN_FAILURE,
    plan_id,
  };
}

export function savePlan(planData) {
  return dispatch => {
    dispatch(savePlanRequest());

    const to_send = {
      ...planData,
      details: {
        title: planData.plans[planData.plan].title,
        years: planData.plans[planData.plan].years,
      },
      _id: planData.plans[planData.plan]._id,
    };

    return fetch(PLAN_API_ROOT+'/save', {
      method: 'post',
      body: JSON.stringify(to_send),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(savePlanSuccess(data));
        dispatch(push('/plan/'+data._id));
      })
      .catch(err => dispatch(savePlanFailure({ err: err })));
  };
}

export function loadPlan(planId) {
  return dispatch => {
    dispatch(loadPlanRequest(planId));
    return fetch(PLAN_API_ROOT+'/open', {
      method: 'post',
      body: JSON.stringify({ _id: planId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(loadPlanSuccess(data));
      })
      .catch(err => dispatch(loadPlanFailure(planId, err)));
  };
}

export function deletePlan(planId) {
  return dispatch => {
    dispatch(deletePlanRequest());
    return fetch(PLAN_API_ROOT+'/delete/'+planId, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(deletePlanSuccess());
      })
      .catch(err => dispatch(deletePlanFailure({ err: err })));
  };
}
