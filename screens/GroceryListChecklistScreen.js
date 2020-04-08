import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Alert} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import {Button, CheckBox, ListItem, Overlay} from "react-native-elements";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";
import {Notifications} from "expo";

export default function GroceryListChecklistScreen({navigation, route}) {
  const groceryList = route.params;
  const [checkedItems, setCheckedItems] = useState({});
  const [isQRCodeVisible, setQRCodeVisibility] = useState(false);

  function handleNotification(notification) {
    console.log(notification);
    alert(`Order completed. You received ${groceryList.items.length} Grocer Point(s).`);
    setQRCodeVisibility(false);
    navigation.dangerouslyGetParent()?.dangerouslyGetParent()?.dangerouslyGetParent()?.setOptions(StackWrapperScreenOptions);
    navigation.reset({
      index: 0,
      routes: [
        {name: 'GroceryListSearch'}
      ]
    });
  }

  useEffect(() => {
    const listener = Notifications.addListener(handleNotification);
    return () => {
      console.log("Removed listener.");
      listener.remove();
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={groceryList.items}
        renderItem={({item: groceryItem}) => {
          const item = groceryItem.item;
          return (
            <View>
              <ListItem
                leftAvatar={{source: {uri: item.imageUrl}}}
                rightElement={
                    <CheckBox
                    checked={checkedItems[item._id]}
                    onPress={() => {
                      const newCheckedItems = {...checkedItems};
                      if (checkedItems[item._id])
                        delete newCheckedItems[item._id];
                      else
                        newCheckedItems[item._id] = true;
                      setCheckedItems(newCheckedItems);
                    }}
                    />
                }
                title={`${item.name} (${groceryItem.count?.toString()})`}
                bottomDivider={true}
              />
            </View>
          );
        }}
        keyExtractor={item => item._id}
      />
      <View
        style={styles.qrStyle}
      >
        <Overlay
          isVisible={isQRCodeVisible}
          onBackdropPress={() => setQRCodeVisibility(false)}
        >
          <View style={styles.completionOverlay}>
            <SvgQRCode
              value={groceryList._id}
            />
            <Text style={{padding:20}}>When checking out, make sure to check out your order separately from the requestor's, and show them this QR Code when they check out the requestor's order.</Text>
          </View>
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
          onPress={() => {
            if (Object.keys(checkedItems).length !== groceryList.items.length) {
              Alert.alert(
                "Are you sure?",
                "It looks like you haven't checked all the items off the" +
                " grocery list. If certain items are out of stock, make sure" +
                " to let the workers know!",
                [
                  {text: "Finish", onPress: () => {
                    setQRCodeVisibility(true);
                  }},
                  {text: "Nevermind"}
                ]
              );
            } else {
              setQRCodeVisibility(true);
            }
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
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  buttonContainer: {
    margin: 10,
    flex: 1,
    flexGrow: 1,
  },
  completionOverlay: {
    flex:1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
