import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Button} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";

export default function GroceryItemScreen({navigation, route}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  const [itemQuantity, setItemQuantity] = useState(1);
  return (
    <View style={styles.pageStyle}>
      <Image source={{uri: route.params.imageUrl}} style={styles.imageStyle}/>
      <View style={styles.counterStyle}>
        <Button
          icon={{name: 'minus', type: 'entypo'}}
          type='clear'
          onPress={() => {
            if (itemQuantity > 1) setItemQuantity(itemQuantity-1);
          }}
        />
        <Text style={styles.count}>{itemQuantity}</Text>
        <Button
          type="clear"
          icon={{name: 'plus', type: 'entypo'}}
          onPress={() => {
            if (itemQuantity < 9) setItemQuantity(itemQuantity+1);
          }}
        />
      </View>
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
  },
  counterStyle: {
    flex: -1,
    flexDirection: 'row'
  },
  imageStyle: {
    width:200,
    height:200
  },
  count: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center'
  },
});