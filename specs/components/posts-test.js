jest.dontMock(`${ __APPDIR__ }/components/posts`);

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const PostsComponentRaw = require(__APPDIR__+'/components/posts').Posts;
const PostsFixture = require('../fixtures/posts');
const actions = require(__APPDIR__+'/actions/posts');

describe('Posts Component', function() {
  const dispatch = jasmine.createSpy();
  function setupStoreAndRender(stateArgs){
    const state = stateArgs || {
      posts: {
        isFetching: false,
        data: [],
      }
    };
    return TestUtils.renderIntoDocument(
      <PostsComponentRaw posts={state.posts} dispatch={dispatch} />
    );
  }

  describe('there are no posts', function() {
    it('renders no posts to show', function() {
      const postsComponent = setupStoreAndRender();
      const noPostsEl = TestUtils.findRenderedDOMComponentWithClass(postsComponent, 'no-posts');
      expect(noPostsEl).toBeTruthy();
    });
  });

  describe('there are posts', function() {
    const stateWithPosts = {
      posts: {
        isFetching: false,
        data: PostsFixture.posts,
      }
    }
    const postsComponent = setupStoreAndRender(stateWithPosts);

    it('renders post-row for each post', function() {
      const postsEl = TestUtils.scryRenderedDOMComponentsWithClass(postsComponent, 'post-row');
      expect(postsEl.length).toEqual(2);
    });

    it('renders posts title', function() {
      const postsTitleEl = TestUtils.scryRenderedDOMComponentsWithClass(postsComponent, 'post-title');
      expect(
        postsTitleEl.map((el) => { return el.textContent; })
      ).toEqual(
        PostsFixture.posts.map((post) => { return post.title; })
      );
    });

    it('renders post createdAt', function() {
      const postsDateEl = TestUtils.scryRenderedDOMComponentsWithClass(postsComponent, 'post-date');
      expect(
        postsDateEl.map((el) => { return el.textContent; })
      ).toEqual(
        PostsFixture.posts.map((post) => { return post.createdAt; })
      );
    });
  });

  describe('componentDidMount', function() {
    it('dispatches FETCH_CONVERSATION', function() {
      setupStoreAndRender();
      expect(dispatch).toHaveBeenCalledWith(actions.fetchPosts());
    });
  });
});
