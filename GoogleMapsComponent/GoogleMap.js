// core modules
import React, { Component,
                PropTypes }   from 'react';
import ReactDOM               from 'react-dom';
import google                 from 'google';

import _                      from 'lodash/core';

import Marker                 from './Marker';


export class GoogleMap extends Component {
  static propTypes = {
    center:               PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    containerStyle:       PropTypes.object,
    directionMarkers:     PropTypes.shape({
      origin:       PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(Marker)
      ]),
      destination:  PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(Marker)
      ]),
      waypoints:    PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(Marker)
      ]))
    }),
    mapOptions:           PropTypes.object,
    markers:              PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Marker)
    ])),
    subscribePanTo:       PropTypes.func,
    unsubscribePanTo:     PropTypes.func,
    zoom:                 PropTypes.number,
    showDirections:       PropTypes.bool,
    showTrafficLayer:     PropTypes.bool
  };

  static defaultProps = {
    containerStyle: {
      width:  '100%',
      height: '100%'
    },
    directionsMarkers: {
      origin: null,
      destination: null,
      waypoints: []
    },
    mapOptions: {
      center: {
        lat:    30.3074625,
        lng:    -98.0335911
      },
      mapTypeControl: false,
      streetViewControl: false,
      zoom:     10
    },
    markers:  [],
    subscribePanTo: () => {},
    unsubscribePanTo: () => {},
    showDirections:   true,
    showTrafficLayer: true
  };

  _directionsService  = null;
  _directionsDisplay  = null;
  _map                = null;
  _trafficLayer       = null;
  _mapMarkers         = {};

  constructor(props) {
    super(props);
  }

  mapOptions() {
    const { center, mapOptions, zoom } = this.props;

    if (center) {
      mapOptions.center = center;
    }
    if (zoom) {
      mapOptions.zoom = zoom;
    }

    return mapOptions;
  }

  processMarkers(markers, map) {
    this._mapMarkers = markers.reduce(function (reduction, marker) {
      reduction[marker.id] = new google.maps.Marker({
        label:    marker.label,
        map:      map,
        position: marker.position,
        title:    marker.title,
      });

      return reduction;
    }, {});
  }

  clearMarkers() {
    const markerKeys = Object.keys(this._mapMarkers);
    const mapMarkers = this._mapMarkers;
    markerKeys.forEach(function (markerKey) {
      mapMarkers[markerKey].setMap(null);
      delete mapMarkers[markerKey];
    });
    this._mapMarkers = null;
  }

  processTrafficLayer(enableTrafficLayer) {
    if (enableTrafficLayer) {
      this._trafficLayer = new google.maps.TrafficLayer({
        map: this._map
      });
    }
    else if (this._trafficLayer) {
      this._trafficLayer.setMap(null);
      this._trafficLayer = null;
    }
  }

  processDirections(enableDirections) {
    const { origin, destination, waypoints } = this.props.directionsMarkers;
    if (enableDirections) {
      this.clearMarkers();
      this._directionsService = new google.maps.DirectionsService();
      const directionsDisplay = this._directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this._map);
      this._directionsService.route({
          origin: origin.position,
          destination: destination.position,
          waypoints: waypoints.map(waypoint => {
            return {location: waypoint.position, stopover: true};
          }),
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true
        },
        function (result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        }
      );
    }
  }

  panTo = (msg, latLng) => {
    this._map.panTo(latLng);
  }

  componentDidMount() {
    const { markers, showDirections }  = this.props;

    this._map = new google.maps.Map(ReactDOM.findDOMNode(this), this.mapOptions());

    this.processTrafficLayer(this.props.showTrafficLayer);

    this.processMarkers(markers, this._map);

    this.processDirections(showDirections);

    this.props.subscribePanTo(this.panTo);
  }

  componentWillReceiveProps(nextProps) {
    this.processMarkers(nextProps.markers, this._map);

    this._map.setOptions(this.mapOptions());

    this.processTrafficLayer((this.props.showTrafficLayer !== nextProps.showTrafficLayer) && nextProps.showTrafficLayer);
  }

  componentWillUnmount() {
    this.props.unsubscribePanTo(this.panTo);
  }

  render() {
    const { containerStyle } = this.props;

    return (
      <div style={containerStyle}>Map</div>
    );
  }

}
