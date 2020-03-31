import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";

export default function ItemCounter({_id}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

  return (
    <View style={styles.container}>
      <Button
        icon={{name: 'minus', type: 'entypo'}}
        type='clear'
        onPress={() => {
          const count = groceryList[_id].count;
          if (count > 1) {
            const newItem = {
              ...groceryList[_id],
              count: count - 1
            };
            setGroceryList({...groceryList, [_id]: newItem})
          }
        }}
      />
      <Text style={styles.count}>{groceryList[_id].count ?? 0}</Text>
      <Button
        type="clear"
        icon={{name: 'plus', type: 'entypo'}}
        onPress={() => {
          const count = groceryList[_id].count;
          if (count < 9) {
            const newItem = {
              ...groceryList[_id],
              count: count + 1
            };
            setGroceryList({...groceryList, [_id]: newItem});
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