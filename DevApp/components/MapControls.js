// core modules
import React, { Component,
                PropTypes }   from 'react';

import GoogleMapsComponent    from '../../GoogleMapsComponent/index';
const  { Marker }             = GoogleMapsComponent;

export class MapControls extends Component {
  static propTypes = {
    markers:                      PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Marker)
    ])),
    panMap:                       PropTypes.func,
    showDirections:               PropTypes.bool,
    setDirectionsDisplayState:    () => {}
  };

  static defaultProps = {
    markers:                      [],
    panMap:                       () => {},
    showDirections:               false,
    setDirectionsDisplayState:    () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { markers, panMap, showDirections, setDirectionsDisplayState } = this.props;

    return (
      <div className={'mapControlsContainer'}>
        <div className={'mapControlsContents'}>
          <div className={'mapLayerControls'}>
            <div className={'checkboxControl'}>
              <input type="checkbox" id="directions" checked={showDirections} onChange={event => setDirectionsDisplayState(event.target.checked)}/>
              <label htmlFor="directions">Show Directions</label>
            </div>
          </div>
          <div className={'markerList'}>
            <h3>Markers</h3>
            {markers.map((marker) => {
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
