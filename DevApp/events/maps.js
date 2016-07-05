import PubSub from 'pubsub-js';

const mapsPrefix = 'maps';

const ShortCuts = {
  panMainMap:     `${mapsPrefix}.pan`
};

export const Publish = {
  panMainMap(latLng) {
    PubSub.publish(ShortCuts.panMainMap, latLng);
  }
};

export const Subscribe = {
  panMainMap(handler) {
    return PubSub.subscribe(ShortCuts.panMainMap, handler);
  },
  unsubscribe(token) {
    PubSub.unsubscribe(token);
  }
};

export default {
  Publish,
  Subscribe
};
