// core modules
import React, { Component,
                PropTypes }   from 'react';
import ReactDOM               from 'react-dom';

import GoogleMapsComponent    from '../../GoogleMapsComponent/index';
const  { Marker }             = GoogleMapsComponent;

export class MarkerList extends Component {
  static propTypes = {
    markers:  PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Marker)
    ])),
    panMap:   PropTypes.func
  };

  static defaultProps = {
    markers:  [],
    panMap:   () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { markers, panMap } = this.props;

    return (
      <div className={'markerList'}>
        {markers.map((marker) => {
          return <button type={'button'}
                         key={marker.id}
                         onClick={() => panMap(marker.position)}>{marker.title}</button>;
        })}
      </div>
    );
  }

}
