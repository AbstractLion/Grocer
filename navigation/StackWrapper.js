import React, {useContext, useCallback, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Icon} from "react-native-elements";
import {useFocusEffect, useNavigation, DrawerActions, StackActions} from '@react-navigation/native';
import CurrentStoreContext from "../contexts/CurrentStore";
import StoreSelectionScreen from "../screens/StoreSelectionScreen";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";

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
    const {store} = useContext(CurrentStoreContext);

    return (
      <Stack.Navigator
        mode="modal"
        initialRouteName={props.route.name}
        screenOptions={StackWrapperScreenOptions}
      >
        <Stack.Screen
          name={props.route.name}
          component={component}
          options={{
            title: store.name,
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