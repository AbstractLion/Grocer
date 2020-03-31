import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";
import StoreContext from "../contexts/Store";

function GroceryItemSearchScreen({navigation, ...props}) {
  const [skipValue, setSkipValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [items, updateItems] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const {store} = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://grocerserver.herokuapp.com/items?storeId=${store.id}&filter=${searchValue}&skip=${skipValue}&first=15`);
      const result = await response.json();
      setEndReached(result.length < 15);
      updateItems([...items, ...result]);
    })();
  }, [searchValue, store.id, skipValue]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text) => setSearchValue(text)}
        value={searchValue}
        platform="ios"
        containerStyle={{backgroundColor: 'white'}}
      />
      <FlatList
        data={items}
        horizontal={false}
        numColumns={2}
        renderItem={({item}) => <GroceryItemListing
          _id={item._id}
          name={item.name}
          rating={item.rating}
          price={item.price}
          imageUrl={item.imageUrl}
        />}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={() => {
          setSkipValue(skipValue + 15);
        }}
        onEndReachedThreshold={0.5}
        initialNumToRender={15}
      />
      {endReached ? <ActivityIndicator /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default StackWrapper(GroceryItemSearchScreen);

