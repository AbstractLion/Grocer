import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import {Icon} from "react-native-elements";

export default function GroceryListScreen({navigation, route}) {
  useEffect(() => {
    navigation.dangerouslyGetParent()?.setOptions({
      headerLeft: () => <Icon
        name="chevron-left"
        type="entypo"
        containerStyle={{marginLeft: 15}}
        onPress={() => {
          navigation.goBack();
        }}
      />
    });
  }, []);

  useEffect(() => {

  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={route.params}
      />
    </View>
  );
}