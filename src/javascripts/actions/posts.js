import * as types from '../constants/actionTypes';
import * as endPoints from '../constants/endPoints';

export function fetchPosts() {
  return {
    type          : types.FETCH_POSTS,
    request       : {
      url: endPoints.postsIndex(),
    },
  };
}
