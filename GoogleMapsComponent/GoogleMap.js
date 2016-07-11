// core modules
import React, { Component,
                PropTypes }   from 'react';
import ReactDOM               from 'react-dom';
import google                 from 'google';

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
    showTraffic:          PropTypes.bool
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
    showDirections:   false,
    showTraffic: false
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

  renderMarkers() {
    const map = this._map;
    this._mapMarkers = this.props.markers.reduce(function (reduction, marker) {
      reduction[marker.id] = new google.maps.Marker({
        label:    marker.label,
        map:      map,
        position: marker.position,
        title:    marker.title,
      });

      return reduction;
    }, {});
  }

  enableMarkers() {
    this.renderMarkers();
  }

  disableMarkers() {
    if (this._mapMarkers) {
      const markerKeys = Object.keys(this._mapMarkers);
      const mapMarkers = this._mapMarkers;
      markerKeys.forEach(function (markerKey) {
        mapMarkers[markerKey].setMap(null);
        delete mapMarkers[markerKey];
      });
      this._mapMarkers = null;
    }
  }

  enableTrafficLayer() {
    this._trafficLayer = new google.maps.TrafficLayer({
      map: this._map
    });
  }

  disableTrafficLayer() {
    if (this._trafficLayer && this._trafficLayer.setMap) {
      this._trafficLayer.setMap(null);
      this._trafficLayer = null;
    }
  }

  renderDirections() {
    const { origin, destination, waypoints } = this.props.directionsMarkers;
    const directionsDisplay = this._directionsDisplay;
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

  enableDirections() {
    this._directionsService = new google.maps.DirectionsService();
    this._directionsDisplay = new google.maps.DirectionsRenderer();
    this._directionsDisplay.setMap(this._map);
    this.renderDirections();
  }

  disableDirections() {
    if (this._directionsDisplay) {
      this._directionsDisplay.setMap(null);
      this._directionsDisplay = null;
      this._directionsService = null;
    }
  }

  initializeMap() {
    const { showDirections, showTraffic } = this.props;
    // create a new google map
    this._map = new google.maps.Map(ReactDOM.findDOMNode(this), this.mapOptions());

    // show traffic layer if props say so
    if (showTraffic) {
      this.enableTrafficLayer();
    }

    if (showDirections) {
      this.enableDirections();
    }
    else {
      this.enableMarkers();
    }

    this.props.subscribePanTo(this.panTo);
  }

  updateMap(nextProps) {
    const { showDirections, showTraffic } = nextProps;

    this._map.setOptions(this.mapOptions());

    if (showTraffic) {
      this.enableTrafficLayer();
    }
    else {
      this.disableTrafficLayer();
    }

    if (showDirections) {
      this.disableMarkers();
      this.enableDirections();
    }
    else {
      this.disableDirections();
      this.enableMarkers();
    }
  }

  panTo = (msg, latLng) => {
    this._map.panTo(latLng);
  }

  componentDidMount() {
    this.initializeMap();
  }

  componentWillReceiveProps(nextProps) {
    this.updateMap(nextProps);
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
