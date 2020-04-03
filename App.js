import React, {useState, useEffect, useContext} from 'react';
import {Platform, Text, View} from 'react-native';
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
import ProfileScreen from "./screens/ProfileScreen";

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
  const {user, setUser} = useContext(UserContext);

  return(
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, padding: 15}}>
        <Text style={{fontWeight: "bold", fontSize: 25}}>{user.firstName + ' ' + user.lastName}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>Role: {user.role}</Text>
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
      if (Platform.OS === 'android') {
        await Notifications.createChannelAndroidAsync('notifications', {
          name: 'Notifications',
          vibrate: [250],
          sound: true,
        });
        await Notifications.createChannelAndroidAsync('activated', {
          name: 'Activated',
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async() => {
      const pushToken = await SecureStore.getItemAsync('pushToken');
      if (pushToken) return;

      const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (result.status !== 'granted') {
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      await SecureStore.setItemAsync('pushToken', token);
    })();
  }, []);

  useEffect(() => {
    (async() => {
      const id = await SecureStore.getItemAsync('userId');
      if (!id) return;
      const response = await fetch(`https://grocerserver.herokuapp.com/users/${id}`);
      const result = await response.json();

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
              <Drawer.Screen
                name="Profile"
                options={{
                  title: "Your Profile"
                }}
                component={ProfileScreen}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </GroceryListContext.Provider>
    </CurrentStoreContext.Provider>
  );
}
