import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import App from './components/App';
import DevTools from './components/reduxDevTool/reduxDevTool';
import './index.scss';

// eslint-disable-next-line max-len
const logger = (store) => action => next => {
  const result = action(next);
  console.log('---------STATE----------');
  console.log(store.getState());
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  return result;
};
const rootStore = createStore(rootReducer, compose(applyMiddleware(thunk, logger), DevTools.instrument()));
const root = document.getElementById('root');

const app = (
  <Provider store={rootStore}>
    <App />
    <DevTools />
  </Provider>
);

ReactDOM.render(app, root);
