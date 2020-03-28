import React from 'react';
import GrocerySearchScreen from './screens/GrocerySearchScreen';
import GroceryListSearchScreen from './screens/GroceryListSearchScreen';
import NavigationContainer from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="GrocerySearch"
          component={GrocerySearchScreen}
        />
        <Drawer.Screen
          name="GroceryListSearch"
          component={GroceryListSearchScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
