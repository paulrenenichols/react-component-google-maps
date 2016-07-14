#Google Maps React Component
[![npm version](https://badge.fury.io/js/react-component-google-maps.svg)](https://badge.fury.io/js/react-component-google-maps)

##Documentation
Here's some quick documentation on the component.

###The Package
The package comes with two classes: **GoogleMap** and **Marker**.

**GoogleMap** is the [React](https://facebook.github.io/react/) component that renders a [Google Map](https://developers.google.com/maps/).

**Marker** is an interface that **GoogleMap** uses to render [Map Markers](https://developers.google.com/maps/documentation/javascript/markers). You can subclass (extend) this, or just provide plain JavaScript object with the same shape.

###Component Properites
**GoogleMap** takes the following component properties.

```javascript
  static propTypes = {
    center:               PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    containerStyle:       PropTypes.object,
    directionMarkers:     PropTypes.shape({
      origin:       PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(Marker)
      ]),
      destination:  PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(Marker)
      ]),
      waypoints:    PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(Marker)
      ]))
    }),
    mapOptions:           PropTypes.object,
    markers:              PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Marker)
    ])),
    subscribePanTo:       PropTypes.func,
    unsubscribePanTo:     PropTypes.func,
    zoom:                 PropTypes.number,
    showDirections:       PropTypes.bool,
    showTraffic:          PropTypes.bool
  };
```
**mapOptions** is the [MapOptions](https://developers.google.com/maps/documentation/javascript/reference#MapOptions) object. Map styles can be passed through this property.

**center** and **zoom** are convenience properties that get rolled into **mapOptions** on initialization and update.

##Test Application
I have provided a test application built with [Redux](http://redux.js.org/) for development. This has been packaged up and put on a [GitHub page](https://pages.github.com/) for you to play with.

[View the Test App on GitHub Pages](https://paulrenenichols.github.io/react-component-google-maps/public/)
