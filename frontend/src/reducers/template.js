import {
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
} from '../actions/template';

const initialState = {
  tags: null,
  loadingTags: false,
};


function template(state = initialState, action) {
  switch(action.type) {
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
