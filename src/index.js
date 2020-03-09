import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import App from './components/App';
import DevTools from './components/reduxDevTool/reduxDevTool';

// eslint-disable-next-line max-len
const rootStore = createStore(rootReducer, compose(applyMiddleware(thunk), DevTools.instrument()));
const root = document.getElementById('root');

const app = (
  <Provider store={rootStore}>
    <App />
    <DevTools />
  </Provider>
);

ReactDOM.render(app, root);
