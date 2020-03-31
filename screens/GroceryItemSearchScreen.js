import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";
import CurrentStoreContext from "../contexts/CurrentStore";

function GroceryItemSearchScreen({navigation, ...props}) {
  const [skipValue, setSkipValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [items, updateItems] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const {currentStore} = useContext(CurrentStoreContext);

  async function fetchData() {
    const response = await fetch(`https://grocerserver.herokuapp.com/items?storeId=${currentStore.id}&filter=${searchValue}&skip=${skipValue}&first=16`);
    const result = await response.json();
    setEndReached(result.length < 16);
    updateItems([...items, ...result]);
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [searchValue, skipValue]);

  function search(text) {
    const searchVal = text;
    setSearchValue(text);
    setTimeout(async () => {
      if (searchVal === searchValue) {
        console.log('test');
        await fetchData();
      }
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text) => search(text)}
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
          setSkipValue(skipValue + 16);
        }}
        onEndReachedThreshold={0.1}
        initialNumToRender={16}
        ListFooterComponent={endReached ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default StackWrapper(GroceryItemSearchScreen);

