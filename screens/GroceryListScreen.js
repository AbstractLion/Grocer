import React from 'react';
import {View} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';

export default function GroceryListScreen() {
  return (
    <View style={{flex: 1}}>
      <SvgQRCode
        value="http://facebook.github.io/react-native"
      />
    </View>
  );
}