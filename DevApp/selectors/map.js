import { createImmutableSelector }  from './util';

export const map      = state => state.get('map');

export const center   = createImmutableSelector(
  map,
  map => map.get('center').toJS()
);

export const markers  = createImmutableSelector(
  map,
  map => map.get('markers').toJS()
);

export const zoom     = createImmutableSelector(
  map,
  map => map.get('zoom')
);

export default {
  map,
  center,
  markers,
  zoom
};
