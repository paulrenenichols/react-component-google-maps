export const MAP_SET_DIRECTIONS_DISPLAY_STATE = Symbol('MAP_SET_DIRECTIONS_DISPLAY_STATE');
export function mapSetDirectionsDisplayState(displayState) {
  return {
    type: MAP_SET_DIRECTIONS_DISPLAY_STATE,
    displayState
  };
}
