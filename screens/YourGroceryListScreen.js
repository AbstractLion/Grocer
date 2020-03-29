import React, {useContext} from 'react';
import {FlatList, StyleSheet, View, SafeAreaView} from 'react-native';
import StackWrapper from "../navigation/StackWrapper";
import {ListItem} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";
import ItemCounter from "../components/ItemCounter";
import {SwipeRow} from 'react-native-swipe-list-view';
import {Button} from 'react-native-elements';
import cuid from 'cuid';

function YourGroceryListScreen() {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.entries(groceryList)}
        ListEmptyComponent={
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            Your cart is empty!
          </View>
        }
        renderItem={({item: [id, item]}) => {
          return (
            <SwipeRow
              leftOpenValue={75}
            >
              <View style={styles.swipe}/>
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
        disabled={Object.keys(groceryList).length === 0}
        onPress={() => {
          fetch('/lists', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: Math.floor(Math.random()*10000000000000000),
              author: "TODO",
              createdAt: Date.now(),
              qrCode: cuid(),
              items: groceryList,
            }),
          });
        }}
        containerStyle={{
          width: '80%',
          alignSelf: 'center',
          margin: 20
        }}
      />
    </SafeAreaView>
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