import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import App from './components/App';


const rootStore = createStore(rootReducer);

const root = document.getElementById('root');

const app = (
  <Provider store={rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(app, root);
