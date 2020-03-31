import React, {useEffect} from 'react';
import {View} from 'react-native';
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

  return (
    <View style={{flex: 1}}>
      <SvgQRCode
        value="http://facebook.github.io/react-native"
      />
    </View>
  );
}