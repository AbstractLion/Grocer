import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import StackWrapper from "../navigation/StackWrapper";
import {ListItem} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";
import ItemCounter from "../components/ItemCounter";
import InventoryContext from "../contexts/Inventory";

function YourGroceryListScreen() {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  const {inventory} = useContext(InventoryContext);

  return (
    <FlatList
      data={Object.entries(groceryList)}
      renderItem={({item: [id, count]}) => {
        const item = inventory[id];
        return <ListItem
          leftAvatar={{source: {uri: item.imageUrl}}}
          rightElement={<ItemCounter id={id}/>}
          title={item.title}
          bottomDivider={true}
        />
      }}
      keyExtractor={([id]) => id.toString()}
    />
  );
}

export default StackWrapper(YourGroceryListScreen, {
  headerRight: null,
  title: "Your Grocery List"
});