import React from 'react';
import {Icon} from 'react-native-elements';
import {DrawerActions} from '@react-navigation/native';
import {navigationRef} from '../navigation/RootNavigation';

export default {
  headerLeft: () => <Icon
    name="menu"
    type="entypo"
    size={30}
    containerStyle={{marginLeft: 15}}
    onPress={() => {
      navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
    }}
  />,
  headerRight: () => <Icon
    name="location-pin"
    type="entypo"
    size={30}
    containerStyle={{marginRight: 15}}
    onPress={() => {
      navigationRef.current?.navigate("StoreSelection");
    }}
  />
}