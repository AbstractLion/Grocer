import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Alert} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import {Button, CheckBox, ListItem, Overlay} from "react-native-elements";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";

export default function GroceryListChecklistScreen({navigation, route}) {
  const groceryList = route.params;
  const [groceryListItems, setGroceryListItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [isQRCodeVisible, setQRCodeVisibility] = useState(false);

  useEffect(() => {
    let orderedItems = [];
    for (let [key, value] of Object.entries(groceryList.items)) {
      let obj = value;
      obj._id = key;
      orderedItems.push(obj);
    }
    setGroceryListItems(orderedItems);
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={groceryListItems}
        renderItem={({item}) => (
          <View>
            <ListItem
              leftAvatar={{source: {uri: item.imageUrl}}}
              rightElement={<CheckBox
                checked={checkedItems[item._id]}
                onPress={() => {
                  const newCheckedItems = {...checkedItems};
                  if (checkedItems[item._id])
                    delete newCheckedItems[item._id];
                  else
                    newCheckedItems[item._id] = true;
                  setCheckedItems(newCheckedItems);
                }}
              />}
              title={`${item.name} (${item.count?.toString()})`}
              bottomDivider={true}
            />
          </View>
        )}
        keyExtractor={item => item._id}
      />
      <View
        style={styles.qrStyle}
      >
        <Overlay
          isVisible={isQRCodeVisible}
        >
          <SvgQRCode
            value={groceryList._id}
          />
          <Text>When checking out, make sure to check out your order separately from the requestor's, and show them this QR Code when they check out the requestor's order.</Text>
        </Overlay>
      </View>
      <View style={styles.buttonView}>
        <Button
          buttonStyle={{backgroundColor: 'red'}}
          containerStyle={[styles.buttonContainer, {marginRight: 5}]}
          title="Cancel"
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "You will not be able to fulfill another request" +
              " within 24 hours. Make sure that you don't cancel often, or" +
              " your account may be suspended.",
              [
                {text: "Cancel anyways", onPress: () => {
                  navigation.popToTop();
                }},
                {text: "Nevermind"}
              ]
            );
          }}
        >
          Cancel
        </Button>
        <Button
          containerStyle={[styles.buttonContainer, {marginLeft: 5}]}
          title="Complete"
          disabled={Object.keys(checkedItems).length !== groceryListItems.length}
          onPress={() => {
            setQRCodeVisibility(true);
          }}
        >
          Complete
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 50,
    width: 50,
  },
  qrStyle: {
    alignItems: 'center'
  },
  buttonView: {
    flex: 1,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  buttonContainer: {
    margin: 10,
    flex: 1,
    flexGrow: 1,
  }
});
