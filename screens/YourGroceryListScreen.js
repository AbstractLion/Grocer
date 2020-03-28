import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import StackWrapper from "../navigation/StackWrapper";
import {ListItem} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";
import ItemCounter from "../components/ItemCounter";
import {SwipeRow} from 'react-native-swipe-list-view';
import {Button} from 'react-native-elements';

function YourGroceryListScreen() {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(groceryList)}
        renderItem={({item: [id, item]}) => {
          return (
            <SwipeRow
              leftOpenValue={75}
            >
              <View style={styles.swipe} />
              <ListItem
                leftAvatar={{source: {uri: item.imageUrl}}}
                rightElement={<ItemCounter id={id}/>}
                title={item.title}
                bottomDivider={true}
              />
            </SwipeRow>
          );
        }}
        keyExtractor={([id]) => id.toString()}
      />
      <Button
        title="Submit Grocery List Request"
        onPress={() => {
          // TODO Send grocery list to server
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swipe: {
    backgroundColor: 'red'
  }
});

export default StackWrapper(YourGroceryListScreen, {
  headerRight: null,
  title: "Your Grocery List"
});