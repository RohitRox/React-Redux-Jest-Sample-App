import * as types from '../constants/ActionTypes';

const initialState = {
  isFetching    : false,
  data          : [],
};

export default function conversations(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_POSTS:
      return Object.assign({}, state, {
        isFetching    : true,
      });
    case types.FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data      : action.payload,
      });
    default:
      return state;
  }
}
