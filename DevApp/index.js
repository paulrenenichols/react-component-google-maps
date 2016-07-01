import 'babel-polyfill';
import React                                    from 'react';
import { render }                               from 'react-dom';
import Root                                     from './containers/Root';
import configureStore                           from './store/configureStore';

import './styles/main.less';

// Create the application's data store
const store = configureStore();

if (__DEV__) {
  window.store = store;
}


// Boot up the application
//
// Nothing here yet

render(
  <Root store={store} />
  ,
  document.getElementById('appBootElement')
);
