import React, {useContext} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";

export default function ItemCounter(props) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  const {id} = props;

  return (
    <View>
      <Input
        leftIcon={
          <Button
            icon={{name: 'minus', type: 'entypo'}}
            onPress={() => {
              if (groceryList[id] > 1) {
                setGroceryList({
                  ...groceryList,
                  [id]: groceryList[id] - 1
                })
              }
            }}
          />
        }
        rightIcon={
          <Button
            icon={{name: 'plus', type: 'entypo'}}
            onPress={() => {
              if (groceryList[id] < 10) {
                setGroceryList({
                  ...groceryList,
                  [id]: groceryList[id] + 1
                })
              }
            }}
          />
        }
      />
    </View>
  )
}