import React, {useContext, useState} from 'react';
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
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.entries(groceryList)}
        ListEmptyComponent={
          <View style={styles.listEmptyComponent}>
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
                  <Text style={styles.deleteText}>Delete</Text>
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
        loading={loading}
        title="Submit Grocery List Request"
        disabled={Object.keys(groceryList).length === 0}
        onPress={async () => {
          if (user.role === 'Worker') {
            alert("You need to be a shopper to perform this action.");
            return;
          }
          setLoading(true);
          const listsUrl = 'https://grocerserver.herokuapp.com/lists';
          const response = await fetch(listsUrl, {
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
          setLoading(false);
          if (response.status === 400) {
            alert("Something went wrong while trying to process your order");
            return;
          }
          setGroceryList({});
          alert("Your grocery list was sucessfully submitted.");
          navigation.navigate("GrocerySearch");
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
  },
  listEmptyComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  }

});

export default StackWrapper(YourGroceryListScreen, {
  headerRight: null,
  title: "Your Grocery List"
});