import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button, Image, Rating} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";

export default function GroceryItemScreen({navigation, route}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  const [itemQuantity, setItemQuantity] = useState(1);
  return (
    <View style={styles.pageStyle}>
      <View style={styles.descContainer}>
        <Text style={{fontWeight:"bold", fontSize: 20, padding:20}}>{route.params.name}</Text>
        <Image source={{uri: route.params.imageUrl}} style={styles.imageStyle}/>
        <Rating
          imageSize={20}
          readonly
          startingValue={route.params.rating}
        />
        <Text style={{padding: 10, fontSize: 15, fontWeight: "bold"}}>${route.params.price.toFixed(2)}</Text>
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
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={"Add to Cart"}
          titleStyle={styles.buttonTextStyle}
          buttonStyle={{height:50}}
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
                count: count + itemQuantity
              };
              setGroceryList({...groceryList, [route.params._id]: newItem});
            }
            navigation.pop();
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  descContainer: {
    alignItems: "center"
  },
  buttonContainer: {
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
    height:200,
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