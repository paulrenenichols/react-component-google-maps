import { createSelectorCreator, defaultMemoize }  from 'reselect';
import Immutable                                  from 'immutable';

export const createImmutableSelector = createSelectorCreator(
  defaultMemoize,
  Immutable.is
);
