import React, { Component }             from 'react';
import { Provider }                     from 'react-redux';
import App                              from './App';

// Debugging imports for development test in browser console
import Immutable                        from 'immutable';
import Perf                             from 'react-addons-perf';

window.DevSandBox                       = {};
window.DevSandBox.Immutable             = Immutable;
window.DevSandBox.Perf                  = Perf;


export default class Root extends Component {
  constructor(props) {
    super(props);
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
