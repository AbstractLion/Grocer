import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import GroceryItemSearchScreen from './screens/GroceryItemSearchScreen';
import GroceryListSearchScreen from './screens/GroceryListSearchScreen';
import YourGroceryListScreen from './screens/YourGroceryListScreen';
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {navigationRef, isMountedRef} from "./navigation/RootNavigation";
import CurrentStoreContext from "./contexts/CurrentStore";
import GroceryListContext from "./contexts/GroceryList";
import UserContext from "./contexts/User";
import ScannerScreen from "./screens/ScannerScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

const userInfo = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  phone: "(416) 132-4634",
  timeout: "00:34",
  role: "Worker",
  description: "Worker for Walmart"
};

function DrawerContent(props) {
  return(
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, padding: 15}}>
        <Text style={{fontWeight: "bold", fontSize: 25}}>{userInfo.name}</Text>
        <Text>{userInfo.email}</Text>
        <Text>{userInfo.phone}</Text>
        <Text>Timeout: {userInfo.timeout}</Text>
        <Text>Role: {userInfo.role}</Text>
        <Text>Description: {userInfo.description}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [currentStore, setCurrentStore] = useState({name: "Walmart", id: 0});
  const [groceryList, setGroceryList] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    (async() => {
      const pushToken = await SecureStore.getItemAsync('pushToken');
      if (pushToken) return;

      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') return;
      let token = await Notifications.getExpoPushTokenAsync();
      await SecureStore.setItemAsync('pushToken', token);
    })();
  }, []);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <CurrentStoreContext.Provider value={{currentStore, setCurrentStore}}>
      <GroceryListContext.Provider value={{groceryList, setGroceryList}}>
        <UserContext.Provider value={{user, setUser}}>
          <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
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
    </CurrentStoreContext.Provider>
  );
}