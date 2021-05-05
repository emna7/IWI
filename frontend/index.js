import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Event from './components/event/CreateEvent'
import store from './redux/store.js';
import { Provider, } from 'react-redux';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('app')
// );


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
