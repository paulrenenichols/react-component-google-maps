// core modules
import React, { Component }                         from 'react';
import { connect }                                  from 'react-redux';

import GoogleMapsComponent                          from '../../GoogleMapsComponent/index';
const  GoogleMap                                    = GoogleMapsComponent.GoogleMap;


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
        <GoogleMap />
      </div>
    );
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(App);
