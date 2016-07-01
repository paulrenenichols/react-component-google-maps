// core modules
import React, { Component }                         from 'react';
import { connect }                                  from 'react-redux';


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

class App extends Component {

  render() {
    return (
      <div className={'gmAppContainer'}>
        <h1>Google Maps React Component</h1>
      </div>
    );
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(App);
