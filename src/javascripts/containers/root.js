import React, { Component } from 'react';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import { IndexRoute } from 'react-router';

import Posts from '../components/posts';

export default class Root extends Component {
  render() {
    return (
      <div>
        <ReduxRouter>
          <Route path="/" component={Posts}>
          </Route>
        </ReduxRouter>
      </div>
    );
  }
}
