import React from 'react';

const GroceryListContext = React.createContext({
  groceryList: {},
  setGroceryList: () => {}
});

export default GroceryListContext;