import React from 'react';

const CurrentStoreContext = React.createContext({
  currentStore: {},
  setCurrentStore: () => {}
});

export default CurrentStoreContext;