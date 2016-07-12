export const MAP_SET_DIRECTIONS_DISPLAY_STATE = Symbol('MAP_SET_DIRECTIONS_DISPLAY_STATE');
export function mapSetDirectionsDisplayState(displayState) {
  return {
    type: MAP_SET_DIRECTIONS_DISPLAY_STATE,
    displayState
  };
}

export const MAP_SET_TRAFFIC_DISPLAY_STATE = Symbol('MAP_SET_TRAFFIC_DISPLAY_STATE');
export function mapSetTrafficDisplayState(displayState) {
  return {
    type: MAP_SET_TRAFFIC_DISPLAY_STATE,
    displayState
  };
}
