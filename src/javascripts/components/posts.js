import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/posts';

export class Posts extends Component {
  assemble() {
    let view;
    if ( this.props.posts.isFetching ){
      view = 'Loading ...';
    } else {
      view = this.assemblePosts();
    }
    return view;
  }

  assemblePosts() {
    let view;
    if ( this.props.posts.data.length ) {
      view =  this.props.posts.data.map( (post) => {
        return (
          <div className='post-wrap post-row' key={post.id}>
            <div className='post-title'>{ post.title }</div>
            <div className='post-date'>{ post.createdAt }</div>
          </div>
        );
      });
    } else {
      view = <div className='no-posts post-row'>
        <h2>No posts to show.</h2>
      </div>;
    }

    return view;
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return (
      <div className='posts-container'>
        { this.assemble() }
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(Posts);
