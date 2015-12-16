jest.dontMock(`${ __APPDIR__ }/reducers/posts`);
jest.dontMock(`${ __APPDIR__ }/constants/actionTypes`);

const reducer = require(`${ __APPDIR__ }/reducers/posts`);
const types = require(__APPDIR__+'/constants/actionTypes');

describe('posts reducer', () => {
  it('returns the initial state', () => {
    const expectedState = {
      isFetching: false,
      data: [],
    };
    expect( reducer(undefined, {})).toEqual(expectedState)
  });

  it('handles FETCH_POSTS', () => {
    const expectedState = {
      isFetching: true,
    };
    expect(reducer([], { type: types.FETCH_POSTS })).toEqual(expectedState);
  });

  it('handles FETCH_POSTS_SUCCESS', () => {
    const payload = [{id: '1'}];
    const expectedState = {
      isFetching: false,
      data: payload,
    };
    expect(
      reducer([], { type: types.FETCH_POSTS_SUCCESS, payload: payload })
    ).toEqual(expectedState);
  });
});
