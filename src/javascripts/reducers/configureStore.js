import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';

import api from '../middlewares/api';
import * as reducers from '../reducers';

const middlewares    = [thunk, api];
const storeEnhancers = [
  reduxReactRouter({createHistory}),
];

const combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore    = applyMiddleware(...middlewares)(combinedCreateStore);
const combinedReducer     = combineReducers(Object.assign({
  router: routerStateReducer,
}, reducers));

export default function configureStore(initialState) {
  return finalCreateStore(combinedReducer, initialState);
}
