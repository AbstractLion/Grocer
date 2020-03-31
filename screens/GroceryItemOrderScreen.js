import React, {useContext} from 'react';
import {Text} from 'react-native';
import {Button} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";

export default function GroceryItemScreen({navigation, route}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  return (
    <Button
      title={`\$${price.toFixed(2)}`}
      titleStyle={styles.price}
      onPress={() => {
        groceryList[route.params._id] = groceryList[route.params._id] || {
          name: route.params.name,
          imageUrl: route.params.imageUrl,
          price: route.params.price,
          count: 0,
        };
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
)
}