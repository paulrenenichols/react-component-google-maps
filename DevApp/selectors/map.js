import { createImmutableSelector }  from './util';

export const map                = state => state.get('map');

export const center             = createImmutableSelector(
  map,
  map => map.get('center').toJS()
);

export const markers            = createImmutableSelector(
  map,
  map => map.get('markers').toJS()
);

export const showDirections     = state => map(state).get('showDirections');

export const showTraffic        = state => map(state).get('showTraffic');

export const zoom               = createImmutableSelector(
  map,
  map => map.get('zoom')
);

export const directionsMarkers  = createImmutableSelector(
  markers,
  markers => {
    const origin        = markers[0];
    const destination   = markers[markers.length - 1];
    const waypoints     = markers.filter(function (element, index, array) {
      return (index !== 0) && (index !== array.length - 1);
    });
    return {
      origin,
      destination,
      waypoints
    };
  }
);

export default {
  map,
  center,
  directionsMarkers,
  markers,
  zoom,
  showDirections,
  showTraffic
};
