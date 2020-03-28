import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import StackWrapper from '../navigation/StackWrapper';
import {SearchBar} from "react-native-elements";
import GroceryItemListing from "../components/GroceryItemListing";

function GroceryListSearchScreen() {
  const [searchValue, setSearchValue] = useState('');

  const groceryLists = [
    {
      id: 0,
      author: 'Dragon',
      createdAt: Date.now(),
      items: [
        {
          id: 36,
          title: "Dragonfruit",
          rating: 1,
          price: 20.04
        }
      ],
    }
  ];

  function search() {

  }

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
        data={groceryLists}
        horizontal={false}
        numColumns={2}
        renderItem={({item}) => <GroceryItemListing
          id={item.id}
          title={item.title}
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
  }
});

export default StackWrapper(GroceryListSearchScreen);

