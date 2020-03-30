import React, {useState} from 'react';
import GroceryItemSearchScreen from './screens/GroceryItemSearchScreen';
import GroceryListSearchScreen from './screens/GroceryListSearchScreen';
import YourGroceryListScreen from './screens/YourGroceryListScreen';
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {navigationRef, isMountedRef} from "./navigation/RootNavigation";
import LocationContext from "./contexts/Location";
import GroceryListContext from "./contexts/GroceryList";
import UserContext from "./contexts/User";
import ScannerScreen from "./screens/ScannerScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [location, setLocation] = useState("Walmart");
  const [groceryList, setGroceryList] = useState({});
  const [user, setUser] = useState({});

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      <GroceryListContext.Provider value={{groceryList, setGroceryList}}>
        <UserContext.Provider value={{user, setUser}}>
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
        </UserContext.Provider>
      </GroceryListContext.Provider>
    </LocationContext.Provider>
  );
}
