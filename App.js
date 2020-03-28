import React from 'react';
import GrocerySearchScreen from './screens/GrocerySearchScreen';
import GroceryListSearchScreen from './screens/GroceryListSearchScreen';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from '@react-navigation/stack'
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Main() {
  return (
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerLeft: () => <Icon
            type="entypo"
            name="menu"
          />
        }}
      >
        <Stack.Screen
          name="Main"
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
