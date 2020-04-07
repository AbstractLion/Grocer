import React, {useContext} from "react";
import {Icon} from "react-native-elements";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";
import CurrentStoreContext from "../contexts/CurrentStore";

export default function GoBackIcon({navigation}) {
  const {currentStore} = useContext(CurrentStoreContext);

  return <Icon
    name="chevron-left"
    type="entypo"
    containerStyle={{marginLeft: 15}}
    onPress={() => {
      navigation.dangerouslyGetParent()?.setOptions({
        ...StackWrapperScreenOptions,
        title: currentStore.name
      });
      navigation.pop();
    }}
  />;
}