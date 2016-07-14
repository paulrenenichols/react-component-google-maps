import { createImmutableSelector }  from './util';

export const map                = state => state.get('map');

export const center             = createImmutableSelector(
  map,
  map => map.get('center').toJS()
);

export const catbugMarker       = state => map(state).get('catbugMarker');

export const markers            = createImmutableSelector(
  map,
  map => map.get('markers')
);

export const controlsMarkers    = createImmutableSelector(
  markers,
  catbugMarker,
  (markers, catbugMarker) => markers.push(catbugMarker)
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
    const markersJS     = markers.toJS();
    const origin        = markersJS[0];
    const destination   = markersJS[markersJS.length - 1];
    const waypoints     = markersJS.filter(function (element, index, array) {
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
  catbugMarker,
  controlsMarkers,
  directionsMarkers,
  markers,
  zoom,
  showDirections,
  showTraffic
};
