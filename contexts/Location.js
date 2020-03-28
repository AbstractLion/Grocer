import React from 'react';

const LocationContext = React.createContext({
  location: '',
  setLocation: () => {}
});

export default LocationContext;