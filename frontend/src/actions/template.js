import { TEMPLATE_API_ROOT } from '../util/api-config';
import { handleErrors } from '../util/fetch-utils';

export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';
export const GET_SCHOOLS_REQUEST = 'GET_SCHOOLS_REQUEST';
export const GET_SCHOOLS_SUCCESS = 'GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAILURE = 'GET_SCHOOLS_FAILURE';
export const PUBLISH_REQUEST = 'PUBLISH_REQUEST';
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
export const PUBLISH_FAILURE = 'PUBLISH_FAILURE';
export const STAR_REQUEST = 'STAR_REQUEST';
export const STAR_SUCCESS = 'STAR_SUCCESS';
export const STAR_FAILURE = 'STAR_FAILURE';
export const TEMPLATE_REQUEST = 'TEMPLATE_REQUEST';
export const TEMPLATE_SUCCESS = 'TEMPLATE_SUCCESS';
export const TEMPLATE_FAILURE = 'TEMPLATE_FAILURE';

function templateRequest(id) {
  return {
    type: TEMPLATE_REQUEST,
    id,
  };
}
function templateSuccess(template) {
  return {
    type: TEMPLATE_SUCCESS,
    template,
  };
}
function templateFailure(id, err) {
  return {
    type: TEMPLATE_FAILURE,
    id,
    err,
  };
}


function getTagsRequest() {
  return {
    type: GET_TAGS_REQUEST,
  };
}
function getTagsSuccess(tags) {
  return {
    type: GET_TAGS_SUCCESS,
    tags,
  };
}
function getTagsFailure(err) {
  return {
    type: GET_TAGS_FAILURE,
    err,
  };
}

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

function publishRequest() {
  return {
    type: PUBLISH_REQUEST,
  };
}
function publishSuccess() {
  return {
    type: PUBLISH_SUCCESS,
  };
}
function publishFailure(err) {
  return {
    type: PUBLISH_FAILURE,
    err,
  };
}

function starRequest(templateId) {
  return { type: STAR_REQUEST, templateId };
}
function starSuccess(templateId, stars) {
  return { type: STAR_SUCCESS, templateId, stars };
}
function starFailure(templateId, err) {
  return { type: STAR_FAILURE, templateId, err };
}

export function toggleStar(templateId) {
  return dispatch => {
    dispatch(starRequest(templateId));

    return fetch(TEMPLATE_API_ROOT+'/star', {
      method: 'post',
      body: JSON.stringify({ _id: templateId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(starSuccess(templateId, data));
      })
      .catch(err => dispatch(starFailure(templateId, err)));
  };
}


export function getTags() {
  return dispatch => {
    dispatch(getTagsRequest());

    return fetch(TEMPLATE_API_ROOT+'/tags', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(getTagsSuccess(data));
      })
      .catch(err => dispatch(getTagsFailure({ err: err })));
  };
}

export function getSchools() {
  return dispatch => {
    dispatch(getSchoolsRequest());

    return fetch(TEMPLATE_API_ROOT+'/schools', {
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

export function publish(templateDetails, plan) {
  return dispatch => {
    dispatch(publishRequest());

    const { years, terms, courses, colorscheme, requirements } = plan;
    const details = {
      title: plan.plans[plan.plan].title,
      years: plan.plans[plan.plan].years,
    };

    const template = {
      plan: { details, years, terms, courses, colorscheme, requirements },
      description: templateDetails.description,
      school: templateDetails.school,
      tags: templateDetails.tags,
    };

    return fetch(TEMPLATE_API_ROOT+'/publish', {
      method: 'post',
      body: JSON.stringify(template),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(publishSuccess(data));
      })
      .catch(err => dispatch(publishFailure({ err: err })));
  };
}

export function getFullTemplate(id) {
  return dispatch => {
    dispatch(templateRequest(id));

    return fetch(TEMPLATE_API_ROOT+'/get/'+id, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(templateSuccess(data));
      })
      .catch(err => dispatch(templateFailure({ err: err })));
  };
}
