import React, {useEffect} from 'react';
import {View} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import GoBackIcon from "../components/GoBackIcon";

export default function GroceryListScreen({navigation, route}) {
  useEffect(() => {
    navigation.dangerouslyGetParent()?.setOptions({
      headerLeft: () => <GoBackIcon navigation={navigation}/>
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