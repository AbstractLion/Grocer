import React from 'react';

const CurrentStoreContext = React.createContext({
  store: '',
  setStore: () => {}
});

export default CurrentStoreContext;