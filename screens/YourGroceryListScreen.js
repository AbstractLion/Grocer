import React, {useContext} from 'react';
import {FlatList, StyleSheet, View, SafeAreaView, Text, TouchableHighlight} from 'react-native';
import StackWrapper from "../navigation/StackWrapper";
import {ListItem} from "react-native-elements";
import GroceryListContext from "../contexts/GroceryList";
import UserContext from '../contexts/User';
import CurrentStoreContext from "../contexts/CurrentStore";
import ItemCounter from "../components/ItemCounter";
import {SwipeRow} from 'react-native-swipe-list-view';
import {Button} from 'react-native-elements';
import cuid from 'cuid';

function YourGroceryListScreen() {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  const {user} = useContext(UserContext);
  const {currentStore} = useContext(CurrentStoreContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.entries(groceryList)}
        ListEmptyComponent={
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{margin: 50, fontSize: 16}}>Your cart is empty!</Text>
          </View>
        }
        renderItem={({item: [_id, item]}) => {
          return (
            <SwipeRow
              leftOpenValue={80}
            >
              <View style={styles.swipe}>
                <TouchableHighlight
                  onPress={() => {
                    let newList = {...groceryList};
                    delete newList[_id];
                    setGroceryList(newList);
                  }}
                >
                  <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>Delete</Text>
                </TouchableHighlight>
              </View>
              <ListItem
                leftAvatar={{source: {uri: item.imageUrl}}}
                rightElement={<ItemCounter _id={_id}/>}
                title={item.name}
                bottomDivider={true}
                containerStyle={styles.listItem}
              />
            </SwipeRow>
          );
        }}
        keyExtractor={([_id]) => _id.toString()}
      />
      <Button
        title="Submit Grocery List Request"
        disabled={Object.keys(groceryList).length === 0}
        onPress={async () => {
          const response = await fetch('https://grocerserver.herokuapp.com/lists', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              author: user?.firstName + ' ' + user?.lastName,
              storeId: currentStore.id,
              createdAt: Date.now(),
              qrCode: cuid(),
              items: groceryList,
            }),
          });
          const result = await response.json();
          console.log(result);
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
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  listItem: {
    height: 75
  }

});

export default StackWrapper(YourGroceryListScreen, {
  headerRight: null,
  title: "Your Grocery List"
});