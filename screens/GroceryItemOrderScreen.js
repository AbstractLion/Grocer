import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";

export default function GroceryItemScreen({navigation, route}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  const [itemQuantity, setItemQuantity] = useState(0);
  return (
    <View style={styles.pageStyle}>
      <Button
        icon={{name: 'minus', type: 'entypo'}}
        type='clear'
        onPress={() => {
          setItemQuantity(itemQuantity-1);
        }}
      />
      <Text style={styles.count}>{itemQuantity}</Text>
      <Button
        type="clear"
        icon={{name: 'plus', type: 'entypo'}}
        onPress={() => {
          setItemQuantity(itemQuantity+1);
        }}
      />
      <Button
        title={"Add to Cart"}
        titleStyle={styles.buttonTextStyle}
        style={styles.buttonStyle}
        onPress={() => {
          groceryList[route.params._id] = groceryList[route.params._id] || {
            name: route.params.name,
            imageUrl: route.params.imageUrl,
            price: route.params.price,
            count: 0,
          };
          const count = groceryList[route.params._id].count;
          if (count < 9) {
            const newItem = {
              ...groceryList[route.params._id],
              count: count + 1
            };
            setGroceryList({...groceryList, [route.params._id]: newItem});
          }
          navigation.pop();
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "flex-end"
  },
  buttonTextStyle: {
    fontWeight: "bold"
  }
});