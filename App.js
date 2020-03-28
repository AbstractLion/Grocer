import React, {useState} from 'react';
import GrocerySearchScreen from './screens/GrocerySearchScreen';
import GroceryListSearchScreen from './screens/GroceryListSearchScreen';
import YourGroceryListScreen from './screens/YourGroceryListScreen';
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {navigationRef} from "./navigation/RootNavigation";
import LocationContext from "./contexts/Location";
import GroceryListContext from "./contexts/GroceryList";
import InventoryContext from "./contexts/InventoryContext";

const Drawer = createDrawerNavigator();

export default function App() {
  const [location, setLocation] = useState("Walmart");
  const [groceryList, setGroceryList] = useState({});
  const [inventory, setInventory] = useState({});

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      <GroceryListContext.Provider value={{groceryList, setGroceryList}}>
        <InventoryContext.Provider value={{inventory, setInventory}}>
          <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator>
              <Drawer.Screen
                name="GrocerySearch"
                options={{
                  title: "Groceries"
                }}
                component={GrocerySearchScreen}
              />
              <Drawer.Screen
                name="GroceryListSearch"
                options={{
                  title: "Grocery Lists"
                }}
                component={GroceryListSearchScreen}
              />
              <Drawer.Screen
                name="YourGroceryList"
                options={{
                  title: "Your Grocery List"
                }}
                component={YourGroceryListScreen}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </InventoryContext.Provider>
      </GroceryListContext.Provider>
    </LocationContext.Provider>
  );
}
