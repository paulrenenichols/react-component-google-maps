import { fromJS }  from 'immutable';

const initialState = fromJS({
  center: {
    lat:    30.2746652,
    lng:    -97.7403505
  },
  markers:  [
    {
      label:  'D',
      id:     '0001',
      position: {
        lat:  30.2644987,
        lng:  -97.7821164
      },
      title:  'Dropoff'
    },
    {
      label:  'E',
      id:     '0002',
      position: {
        lat:  30.2659184,
        lng:  -97.7356529
      },
      title:  'Easy Tiger'
    },
    {
      label:  'P',
      id:     '0003',
      position: {
        lat:  30.2499844,
        lng:  -97.7522357
      },
      title:  'Perla\'s'
    }
  ],
  zoom:     14
});

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
