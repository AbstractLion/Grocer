import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import {Button, CheckBox, ListItem} from "react-native-elements";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";

export default function GroceryListChecklistScreen({navigation, route}) {
  const groceryList = route.params;
  const [groceryListItems, setGroceryListItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

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
                  setCheckedItems({
                    ...checkedItems,
                    [item._id]: !checkedItems[item._id]
                  });
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
        <SvgQRCode
          value={route.params.qrCode}
        />
      </View>
      <Button
        onPress={() => {
          navigation.popToTop();
        }}
      >
        Cancel
      </Button>
      <Button
        disabled={Object.keys(checkedItems).length !== groceryListItems.length}
        onPress={() => {

        }}
      >
        Complete
      </Button>
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
  }
});
