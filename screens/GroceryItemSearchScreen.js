import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";

function GroceryItemSearchScreen({navigation, ...props}) {
  const [searchValue, setSearchValue] = useState('');
  const [items, updateItems] = useState([]);

  function search() {

  }

  function updateData() {
    fetch('https://grocer-app-flask.herokuapp.com/items')
        .then((response) => response.json())
        .then((json) => {
          updateItems(json.data);
        })
        .catch((error) => {
          console.error("Error occured while getting item list");
        });
  }

  useEffect(() => {
    updateData();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={search}
        value={searchValue}
        platform="ios"
        containerStyle={{backgroundColor: 'white'}}
      />
      <FlatList
        data={items}
        horizontal={false}
        numColumns={2}
        renderItem={({item}) => <GroceryItemListing
          id={item.id}
          name={item.name}
          rating={item.rating}
          price={item.price}
          imageUrl={item.imageUrl}
        />}
        keyExtractor={(item) => item.id.toString()}
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

