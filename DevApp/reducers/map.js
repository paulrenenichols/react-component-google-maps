import { fromJS }   from 'immutable';

import Actions      from '../actions/index';
const  Types        = Actions.Map.Types;

const initialState = fromJS({
  center: {
    lat:    30.2746652,
    lng:    -97.7403505
  },
  markers:  [
    {
      label:  'W',
      id:     '0035',
      position: {
        lat:  30.2705682,
        lng:  -97.7532994
      },
      title:  'Whole Foods Market'
    },
    {
      label:  'D',
      id:     '0010',
      position: {
        lat:  30.2644987,
        lng:  -97.7821164
      },
      title:  'Dropoff'
    },
    {
      label:  'A',
      id:     '0015',
      position: {
        lat:  30.255541,
        lng:  -97.7655079
      },
      title:  'Alamo Drafthouse South Lamar'
    },
    {
      label:  'E',
      id:     '0020',
      position: {
        lat:  30.2659184,
        lng:  -97.7356529
      },
      title:  'Easy Tiger'
    },
    {
      label:  'F',
      id:     '0025',
      position: {
        lat:  30.2613287,
        lng:  -97.7184552
      },
      title:  'Flyrite Chicken Sandwiches'
    },
    {
      label:  'W',
      id:     '0030',
      position: {
        lat:  30.2380491,
        lng:  -97.739416
      },
      title:  'Whip In'
    },
    {
      label:  'P',
      id:     '0040',
      position: {
        lat:  30.2453753,
        lng:  -97.759618
      },
      title:  'Polvos'
    },
    {
      label:  'B',
      id:     '0045',
      position: {
        lat:  30.241757,
        lng:  -97.727171
      },
      title:  'Buzzmill'
    },
    {
      label:  'R',
      id:     '0050',
      position: {
        lat:  30.268691,
        lng:  -97.749149
      },
      title:  'Ranch 616'
    },
    {
      label:  'L',
      id:     '0060',
      position: {
        lat:  30.2529945,
        lng:  -97.7107592
      },
      title:  'Lustre Pearl'
    }
  ],
  showDirections: false,
  showTraffic: false,
  zoom:     14
});

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    case Types.MAP_SET_DIRECTIONS_DISPLAY_STATE:
      return state.set('showDirections', action.displayState);

    case Types.MAP_SET_TRAFFIC_DISPLAY_STATE:
      return state.set('showTraffic', action.displayState);

    default:
      return state;
  }
}
