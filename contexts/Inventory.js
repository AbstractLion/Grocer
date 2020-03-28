import React from 'react';

const Inventory = React.createContext({
  inventory: {},
  setInventory: () => {}
});

export default Inventory;