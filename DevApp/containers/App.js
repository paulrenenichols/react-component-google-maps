// core modules
import React, { Component }                         from 'react';
import { connect }                                  from 'react-redux';

import GoogleMapsComponent                          from '../../GoogleMapsComponent/index';
const  GoogleMap                                    = GoogleMapsComponent.GoogleMap;

import { MapControls }                              from '../components/MapControls';

import selectors                                    from '../selectors/index';
const  { center,
         markers,
         controlsMarkers,
         zoom,
         directionsMarkers,
         showDirections,
         showTraffic }                              = selectors.map;

import events                                       from '../events/index';

import Actions                                      from '../actions/index';
const  Creators                                     = Actions.Map.Creators;

function mapStateToProps(state) {
  return {
    center:             center(state),
    markers:            controlsMarkers(state).toJS(),
    controlsMarkers:    controlsMarkers(state).toJS(),
    zoom:               zoom(state),
    directionsMarkers:  directionsMarkers(state),
    showDirections:     showDirections(state),
    showTraffic:        showTraffic(state)
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
    },
    setDirectionsDisplayState(displayState) {
      dispatch(Creators.mapSetDirectionsDisplayState(displayState));
    },
    setTrafficDisplayState(displayState) {
      dispatch(Creators.mapSetTrafficDisplayState(displayState));
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
