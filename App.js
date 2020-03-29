import React, {useState} from 'react';
import GroceryItemSearchScreen from './screens/GroceryItemSearchScreen';
import GroceryListSearchScreen from './screens/GroceryListSearchScreen';
import YourGroceryListScreen from './screens/YourGroceryListScreen';
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {navigationRef} from "./navigation/RootNavigation";
import LocationContext from "./contexts/Location";
import GroceryListContext from "./contexts/GroceryList";
import ScannerScreen from "./screens/ScannerScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [location, setLocation] = useState("Walmart");
  const [groceryList, setGroceryList] = useState({});

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      <GroceryListContext.Provider value={{groceryList, setGroceryList}}>
        <NavigationContainer ref={navigationRef}>
          <Drawer.Navigator>
            <Drawer.Screen
              name="GrocerySearch"
              options={{
                title: "Groceries"
              }}
              component={GroceryItemSearchScreen}
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
            <Drawer.Screen
              name="Scanner"
              options={{
                title: "Scan QR Code"
              }}
              component={ScannerScreen}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </GroceryListContext.Provider>
    </LocationContext.Provider>
  );
}
