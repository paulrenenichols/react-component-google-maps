import { fromJS }  from 'immutable';

const initialState = fromJS({
  center: {
    lat:    30.3074625,
    lng:    -98.0335911
  },
  markers:  [
    {
      label:  'E',
      id:     '0001',
      position: {
        lat:  30.2659184,
        lng:  -97.7356529
      },
      title:  'Easy Tiger'
    },
    {
      label:  'P',
      id:     '0002',
      position: {
        lat:  30.2499844,
        lng:  -97.7522357
      },
      title:  'Perla\'s'
    }
  ],
  zoom:     10
});

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
