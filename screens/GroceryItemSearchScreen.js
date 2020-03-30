import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";

function GroceryItemSearchScreen({navigation, ...props}) {
  const [searchValue, setSearchValue] = useState('');
  const [items, updateItems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://grocerserver.herokuapp.com/items?filter=${searchValue}`);
      const result = await response.json();
      updateItems(result);
    })();
  }, [searchValue]);

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

