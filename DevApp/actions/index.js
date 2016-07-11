import * as RawMap from './map';


function organizeActionTypesAndCreators(rawActionTypesAndCreators) {
  const actionKeys = Object.keys(rawActionTypesAndCreators);
  return actionKeys.reduce(function(typesAndCreators, key) {
    const property = rawActionTypesAndCreators[key];
    if (typeof property === 'symbol') {
      typesAndCreators.Types[key] = property;
    }
    else if (typeof property === 'function') {
      typesAndCreators.Creators[key] = property;
    }
    return typesAndCreators;
  }, {
    Creators: {},
    Types: {}
  });
}

const Actions = {
  Map:             organizeActionTypesAndCreators(RawMap)
};

export default Actions;
