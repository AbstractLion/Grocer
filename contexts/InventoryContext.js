import React from 'react';

const InventoryContext = React.createContext({
  inventory: {},
  setInventory: () => {}
});

export default InventoryContext;