import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";

export default function ItemCounter({id}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

  return (
    <View style={styles.container}>
      <Button
        icon={{name: 'minus', type: 'entypo'}}
        type='clear'
        onPress={() => {
          if (groceryList[id] > 1) {
            setGroceryList({
              ...groceryList,
              [id]: groceryList[id] - 1
            })
          }
        }}
      />
      <Text style={styles.count}>{groceryList[id]}</Text>
      <Button
        type="clear"
        icon={{name: 'plus', type: 'entypo'}}
        onPress={() => {
          if (groceryList[id] < 9) {
            setGroceryList({
              ...groceryList,
              [id]: groceryList[id] + 1
            })
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row'
  },
  count: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center'
  },
  surface: {
    elevation: 4
  }
});