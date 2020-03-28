import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Icon} from "react-native-elements";
import {useNavigation, DrawerActions} from '@react-navigation/native';
import LocationContext from "../contexts/Location";
import StoreSelectionScreen from "../screens/StoreSelectionScreen";

const Stack = createStackNavigator();

function ExitIcon() {
  const navigation = useNavigation();

  return <Icon
    name="x"
    type="feather"
    size={30}
    containerStyle={{marginLeft: 15}}
    onPress={() => {
      navigation.pop();
    }}
  />
}

function ConfirmIcon() {
    const navigation = useNavigation();

    return <Icon
        name="check"
        type="feather"
        size={30}
        containerStyle={{marginRight: 15}}
        onPress={() => {
            navigation.pop();
        }}
    />
}

export default function(component, options = {}) {
  return function(props) {
    const {location} = useContext(LocationContext);

    console.log(props.route.name);
    return (
      <Stack.Navigator
        mode="modal"
        initialRouteName={props.route.name}
        screenOptions={{
          headerLeft: () => <Icon
            name="menu"
            type="entypo"
            size={30}
            containerStyle={{marginLeft: 15}}
            onPress={() => {
              props.navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          />,
          headerRight: () => <Icon
            name="location-pin"
            type="entypo"
            size={30}
            containerStyle={{marginRight: 15}}
            onPress={() => {
              props.navigation.navigate("StoreSelection");
            }}
          />
        }}
      >
        <Stack.Screen
          component={component}
          name={props.route.name}
          options={{
            title: location,
            ...options
          }}
        />
        <Stack.Screen
          component={StoreSelectionScreen}
          name="StoreSelection"
          options={{
            title: 'Select a store',
            headerLeft: () => <ExitIcon />,
            headerRight: () => <ConfirmIcon/>,
          }}
        />
      </Stack.Navigator>
    );
  }
}