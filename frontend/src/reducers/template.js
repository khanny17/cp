import {
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_SCHOOLS_REQUEST,
  GET_SCHOOLS_SUCCESS,
  GET_SCHOOLS_FAILURE,
} from '../actions/template';

const initialState = {
  tags: null,
  loadingTags: false,
  schools: null,
  loadingSchools: false,
};


function template(state = initialState, action) {
  switch(action.type) {
  case GET_SCHOOLS_REQUEST:
    return { ...state, loadingSchools: true };
  case GET_SCHOOLS_SUCCESS:
    return { ...state, schools: action.schools, loadingSchools: false };
  case GET_SCHOOLS_FAILURE:
    return { ...state, loadingSchools: false };
  case GET_TAGS_REQUEST:
    return { ...state, loadingTags: true };
  case GET_TAGS_SUCCESS:
    return { ...state, tags: action.tags, loadingTags: false };
  case GET_TAGS_FAILURE:
    return { ...state, loadingTags: false };
  default:
    return state;
  }
}

export default template;
