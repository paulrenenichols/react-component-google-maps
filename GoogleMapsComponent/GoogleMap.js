// core modules
import React, { Component,
                PropTypes }   from 'react';
import ReactDOM               from 'react-dom';
import google                 from 'google';


export class GoogleMap extends Component {
  static defaultProps = {
    containerStyle: {
      width: '100%',
      height: '100%'
    }
  };

  static propTypes = {
    containerStyle: PropTypes.object,
    mapLoaded: PropTypes.func
  };

  state = {
    googleMap: null
  };


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const gmap = new google.maps.Map(ReactDOM.findDOMNode(this), {
      center: {lat: 30.3074625, lng: -98.0335911},
      zoom: 10
    });

    this.setState({
      googleMap: gmap
    });
  }

  render() {
    const { containerStyle } = this.props;

    return (
      <div style={containerStyle}>Map</div>
    );
  }

  getMap() {
    return this.state.googleMap;
  }

}
