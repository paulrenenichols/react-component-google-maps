// core modules
import React, { Component,
                PropTypes }   from 'react';

import GoogleMapsComponent    from '../../GoogleMapsComponent/index';
const  { Marker }             = GoogleMapsComponent;

export class MapControls extends Component {
  static propTypes = {
    controlsMarkers:                      PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Marker)
    ])),
    panMap:                       PropTypes.func,
    showDirections:               PropTypes.bool,
    setDirectionsDisplayState:    PropTypes.func,
    setTrafficDisplayState:       PropTypes.func
  };

  static defaultProps = {
    controlsMarkers:                      [],
    panMap:                       () => {},
    showDirections:               false,
    setDirectionsDisplayState:    () => {},
    setTrafficDisplayState:       () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { controlsMarkers,
            panMap,
            showDirections,
            showTraffic,
            setDirectionsDisplayState,
            setTrafficDisplayState } = this.props;

    console.log(controlsMarkers);

    return (
      <div className={'mapControlsContainer'}>
        <div className={'mapControlsContents'}>
          <div className={'mapLayerControls'}>
            <div className={'checkboxControl'}>
              <input type="checkbox" id="directions" checked={showDirections} onChange={event => setDirectionsDisplayState(event.target.checked)}/>
              <label htmlFor="directions">Show Directions</label>
            </div>
            <div className={'checkboxControl'}>
              <input type="checkbox" id="traffic" checked={showTraffic} onChange={event => setTrafficDisplayState(event.target.checked)}/>
              <label htmlFor="traffic">Show Traffic</label>
            </div>
          </div>
          <div className={'markerList'}>
            <h3>Markers</h3>
            {controlsMarkers.map((marker) => {
              return <button type={'button'}
                             key={marker.id}
                             onClick={() => panMap(marker.position)}>{marker.title}</button>;
            })}
          </div>
        </div>
      </div>
    );
  }

}
