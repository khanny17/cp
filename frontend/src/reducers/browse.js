import { MINE_REQUEST, MINE_SUCCESS, MINE_FAILURE } from '../actions/browse';

const initialState = {
  loading_my_plans: true,
  my_plans: null,
};

function browse(state = initialState, action) {
  switch(action.type) {
  case MINE_REQUEST:
    return { ...state, loading_my_plans: true };
  case MINE_FAILURE:
    return { ...state, loading_my_plans: false, my_plans: { error: true } };
  case MINE_SUCCESS:
    return { ...state, loading_my_plans: false, my_plans: action.plans };
  default:
    return state;
  }
}

export default browse;
