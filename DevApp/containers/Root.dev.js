import React, { Component }             from 'react';
import { Provider }                     from 'react-redux';

import App                              from './App';
import Selectors                        from '../selectors/index';
import Actions                          from '../actions/index';

// Debugging imports for development test in browser console
import Immutable                        from 'immutable';
import Perf                             from 'react-addons-perf';

window.DevSandBox                       = {};
window.DevSandBox.Immutable             = Immutable;
window.DevSandBox.Perf                  = Perf;
window.DevSandBox.Selectors             = Selectors;
window.DevSandBox.Actions               = Actions;

export default class Root extends Component {
  constructor(props) {
    super(props);
    window.DevSandBox.store = this.props.store;
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div className={'gmRoot'}>
          <App />
        </div>
      </Provider>
    );
  }
}
