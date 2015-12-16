import fetch from 'isomorphic-fetch';

function apiRequest({url, method, data}, successCallback, errorCallback) {
  fetch(url, {
    method : method || 'GET',
    body   : data ? JSON.stringify(data) : undefined,
    headers: {
      'Accept'      : 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    return response.json();
  })
  .then(successCallback)
  .catch(errorCallback);
}

export default () => dispatch => action => {
  if (!action.request || !action.request.url) {
    return dispatch(action);
  }

  const { type } = action;
  const { url, method, data } = action.request;

  delete(action.request);
  dispatch(action);

  return apiRequest(
    {url, method, data},
    payload => dispatch({
      type       : type + '_SUCCESS',
      requestData: data,
      payload,
    }),
    err => dispatch({
      type  : type + '_ERROR',
      error : err.message || 'Unknown',
      status: (err.response && err.response.status) || 0,
    })
  );
};
