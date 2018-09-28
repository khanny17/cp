import {
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/auth';

let initialUser;
try {
  initialUser = localStorage.getItem('user');
  initialUser = JSON.parse(initialUser);
} catch(error) {
  localStorage.removeItem('user');
  initialUser = null;
}


const initialState = {
  jwt: localStorage.getItem('jwt') || null,
  user: initialUser,
};

function auth(state = initialState, action) {
  switch(action.type) {
  case LOGOUT:
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return { ...state, jwt: null, user: null };
  case REGISTER_REQUEST:
    return state;
  case REGISTER_FAILURE:
    return state;
  case LOGIN_REQUEST:
    return state;
  case LOGIN_FAILURE:
    return state;
  case REGISTER_SUCCESS:
  case LOGIN_SUCCESS:
    localStorage.setItem('jwt', action.jwt);
    localStorage.setItem('user', JSON.stringify(action.user));
    return { ...state, jwt: action.jwt, user: action.user };
  default:
    return state;
  }
}

export default auth;
