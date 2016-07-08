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

export const zoom               = createImmutableSelector(
  map,
  map => map.get('zoom')
);

export const directionsMarkers  = createImmutableSelector(
  markers,
  markers => {
    return {
      origin:       markers[0],
      destination:  markers[markers.length - 1],
      waypoints:    [markers[1]]
    };
  }
);

export default {
  map,
  center,
  directionsMarkers,
  markers,
  zoom
};
