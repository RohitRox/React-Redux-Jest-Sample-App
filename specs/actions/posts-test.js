jest.dontMock(`${ __APPDIR__ }/actions/posts`);

const actions = require(__APPDIR__+'/actions/posts');
const types = require(__APPDIR__+'/constants/actionTypes');
const endPoints = require(__APPDIR__+'/constants/endPoints');

describe('fetchPosts', () => {

  it('creates an action to fetch posts', () => {
    const expectedAction = {
      type: types.FETCH_POSTS,
      request: {
        url: endPoints.postsIndex(),
      }
    }
    expect(actions.fetchPosts()).toEqual(expectedAction)
  });
});
