// core modules
import React, { Component }                         from 'react';
import { connect }                                  from 'react-redux';

import GoogleMapsComponent                          from '../../GoogleMapsComponent/index';
const  GoogleMap                                    = GoogleMapsComponent.GoogleMap;

import { MapControls }                              from '../components/MapControls';

import selectors                                    from '../selectors/index';
const  { center,
         markers,
         zoom,
         directionsMarkers }                        = selectors.map;

import events                                       from '../events/index';

function mapStateToProps(state) {
  return {
    center:             center(state),
    markers:            markers(state),
    zoom:               zoom(state),
    directionsMarkers:  directionsMarkers(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    subscribePanTo(handler) {
      events.maps.Subscribe.panMainMap(handler);
    },
    unsubscribePanTo(handler) {
      events.maps.Subscribe.unsubscribe(handler);
    },
    panMap(latLng) {
      events.maps.Publish.panMainMap(latLng);
    }
  };
}

class App extends Component {

  render() {
    return (
      <div className={'gmAppContainer'}>
        <MapControls {...this.props} />
        <GoogleMap {...this.props} />
      </div>
    );
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(App);
