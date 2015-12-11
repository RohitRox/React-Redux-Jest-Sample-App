import React, { Component } from 'react';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import { IndexRoute } from 'react-router';

import Home from '../components/home';

export default class Root extends Component {
  render() {
    return (
      <div>
        <ReduxRouter>
          <Route path="/" component={Home}>
            <IndexRoute component={Home}/>
          </Route>
        </ReduxRouter>
      </div>
    );
  }
}
