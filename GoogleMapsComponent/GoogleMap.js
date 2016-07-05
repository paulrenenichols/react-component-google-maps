// core modules
import React, { Component,
                PropTypes }   from 'react';
import ReactDOM               from 'react-dom';
import google                 from 'google';

import _                      from 'lodash/core';

import Marker                 from './Marker';


export class GoogleMap extends Component {
  static propTypes = {
    center:           PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    containerStyle:   PropTypes.object,
    mapOptions:       PropTypes.object,
    markers:          PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Marker)
    ])),
    subscribePanTo:   PropTypes.func,
    unsubscribePanTo: PropTypes.func,
    zoom:             PropTypes.number
  };

  static defaultProps = {
    containerStyle: {
      width:  '100%',
      height: '100%'
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
    unsubscribePanTo: () => {}
  };

  state = {
    googleMap: null
  };

  _mapMarkers = {};

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

  panTo = (msg, latLng) => {
    this.state.googleMap.panTo(latLng);
  }

  componentDidMount() {
    const { markers }  = this.props;

    const gmap = new google.maps.Map(ReactDOM.findDOMNode(this), this.mapOptions());

    this.setState({
      googleMap: gmap
    });

    this.processMarkers(markers, gmap);

    this.props.subscribePanTo(this.panTo);
  }

  componentWillReceiveProps(nextProps) {
    this.processMarkers(nextProps.markers, this.state.googleMap);

    this.state.googleMap.setOptions(this.mapOptions());
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
